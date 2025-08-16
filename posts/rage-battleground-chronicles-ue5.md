---
title: "Graphics Programming in Unreal Engine 5: RAGE Battleground Chronicles"
date: "2024-09-05"
excerpt: "A comprehensive look at developing a moddable fighting game in UE5, covering replication, custom shaders, and community-driven content creation."
tags: ["Unreal Engine 5", "Graphics Programming", "Multiplayer", "Game Development", "Blueprints"]
author: "Mikael Aboagye"
---

# Graphics Programming in Unreal Engine 5: RAGE Battleground Chronicles

RAGE Battleground Chronicles represents a unique challenge in modern game development: creating a moddable, anime-styled fighting game that supports both competitive multiplayer and extensive community customization. This project pushed the boundaries of what's possible with Unreal Engine 5, particularly in graphics programming and networked gameplay.

## Project Vision

The goal was ambitious: create a fighting game that captures the visual flair of anime while providing robust modding tools that would allow the community to create custom characters, stages, and even entirely new fighting mechanics. This required a careful balance between performance, visual quality, and extensibility.

## Graphics Pipeline Innovation

### Custom Anime-Style Rendering

Traditional PBR rendering doesn't work well for anime aesthetics. We developed a custom toon shading pipeline that maintains the high-quality look expected from modern games while achieving the distinctive anime visual style:

```cpp
// Custom toon shader implementation
class RAGEBGC_API UToonMaterialParameterCollection : public UMaterialParameterCollection
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toon Shading")
    float RimLightIntensity = 2.0f;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toon Shading")
    float ShadowHardness = 0.8f;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Toon Shading")
    FLinearColor ShadowTint = FLinearColor(0.7f, 0.7f, 0.9f, 1.0f);
};

// Custom lighting calculation for toon shading
float3 CalculateToonLighting(float3 Normal, float3 LightDirection, float3 ViewDirection)
{
    float NdotL = dot(Normal, LightDirection);
    
    // Quantize the lighting into discrete steps
    float ToonFactor = smoothstep(0.0f, 0.01f, NdotL);
    ToonFactor = floor(ToonFactor * 3.0f) / 3.0f;
    
    // Add rim lighting for that anime pop
    float RimDot = 1.0f - dot(Normal, ViewDirection);
    float RimIntensity = smoothstep(0.7f, 1.0f, RimDot);
    
    return ToonFactor + RimIntensity * RimLightIntensity;
}
```

### Lumen Integration for Dynamic Lighting

One of UE5's most impressive features is Lumen, and we leveraged it extensively for dynamic stage lighting during fights. The challenge was maintaining the anime aesthetic while benefiting from realistic global illumination:

```cpp
// Custom Lumen settings for anime-style environments
class RAGEBGC_API ARageStage : public AActor
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Lighting")
    class UPostProcessComponent* ToonPostProcess;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Lighting")
    float LumenSceneDetailLevel = 0.5f; // Reduced for performance
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Lighting")
    bool bUseToonLighting = true;

protected:
    virtual void BeginPlay() override;
    void SetupDynamicLighting();
    
    UFUNCTION(BlueprintCallable, Category = "Stage")
    void UpdateLightingForTimeOfDay(float TimeOfDay);
};

void ARageStage::SetupDynamicLighting()
{
    // Configure Lumen for toon shading compatibility
    if (UWorld* World = GetWorld())
    {
        if (auto* WorldSettings = World->GetWorldSettings())
        {
            WorldSettings->LightmassSettings.bUseAmbientOcclusion = false;
            // Disable certain Lumen features that conflict with toon shading
        }
    }
}
```

## Networked Fighting Game Architecture

### Rollback Netcode Implementation

Fighting games require frame-perfect timing, making networking incredibly challenging. We implemented a rollback netcode system that ensures consistent gameplay across varying network conditions:

```cpp
// Core rollback netcode structure
USTRUCT(BlueprintType)
struct RAGEBGC_API FGameState
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadWrite)
    TArray<FPlayerState> PlayerStates;
    
    UPROPERTY(BlueprintReadWrite)
    int32 FrameNumber = 0;
    
    UPROPERTY(BlueprintReadWrite)
    float GameTimer = 0.0f;
    
    // Serialize for network transmission
    bool NetSerialize(FArchive& Ar, class UPackageMap* Map, bool& bOutSuccess);
};

class RAGEBGC_API URollbackManager : public UGameInstanceSubsystem
{
    GENERATED_BODY()

public:
    // Store game states for rollback
    UPROPERTY()
    TArray<FGameState> GameStateHistory;
    
    // Maximum frames we can rollback
    static constexpr int32 MAX_ROLLBACK_FRAMES = 8;
    
    UFUNCTION(BlueprintCallable)
    void SaveGameState(const FGameState& State);
    
    UFUNCTION(BlueprintCallable)
    bool RollbackToFrame(int32 TargetFrame);
    
    UFUNCTION(BlueprintCallable)
    void ProcessInput(int32 PlayerId, const FInputState& Input, int32 Frame);

private:
    void ResimulateFrames(int32 StartFrame, int32 EndFrame);
    bool ShouldRollback(const FInputState& RemoteInput, int32 Frame);
};
```

### Character Replication System

Each character in RAGE has unique abilities and properties that must be synchronized across all clients. We created a custom replication system optimized for fighting game requirements:

```cpp
// Custom character replication
UCLASS(BlueprintType, Blueprintable)
class RAGEBGC_API ARageCharacter : public ACharacter
{
    GENERATED_BODY()

public:
    // Replicated character properties
    UPROPERTY(ReplicatedUsing = OnRep_Health, BlueprintReadOnly)
    float Health = 100.0f;
    
    UPROPERTY(ReplicatedUsing = OnRep_SpecialMeter, BlueprintReadOnly)
    float SpecialMeter = 0.0f;
    
    UPROPERTY(ReplicatedUsing = OnRep_CurrentMove, BlueprintReadOnly)
    FGameplayTag CurrentMove;
    
    // Custom replication for fighting game states
    UPROPERTY(ReplicatedUsing = OnRep_FightingState, BlueprintReadOnly)
    EFightingState FightingState = EFightingState::Neutral;

protected:
    UFUNCTION()
    void OnRep_Health();
    
    UFUNCTION()
    void OnRep_SpecialMeter();
    
    UFUNCTION()
    void OnRep_CurrentMove();
    
    UFUNCTION()
    void OnRep_FightingState();
    
    // Server-side move validation
    UFUNCTION(Server, Reliable, WithValidation)
    void ServerExecuteMove(FGameplayTag MoveTag, float Timestamp);
    
    UFUNCTION(NetMulticast, Reliable)
    void MulticastPlayMoveAnimation(FGameplayTag MoveTag);

public:
    virtual void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override;
};
```

## Modding System Architecture

### AngelScript Integration

To enable extensive modding while maintaining game security, we integrated AngelScript for custom character behavior and move scripting:

```cpp
// AngelScript wrapper for character moves
class RAGEBGC_API UAngelScriptMoveComponent : public UActorComponent
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Scripting")
    FString ScriptPath;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Scripting")
    TArray<FString> Dependencies;

protected:
    asIScriptEngine* ScriptEngine;
    asIScriptModule* MoveModule;
    asIScriptContext* ScriptContext;
    
public:
    UFUNCTION(BlueprintCallable, Category = "Scripting")
    bool LoadMoveScript(const FString& ScriptContent);
    
    UFUNCTION(BlueprintCallable, Category = "Scripting")
    bool ExecuteMove(const FString& FunctionName, const TArray<float>& Parameters);
    
    UFUNCTION(BlueprintCallable, Category = "Scripting")
    void RegisterGameplayFunctions();

private:
    void SetupScriptEngine();
    void RegisterUE5Bindings();
};

// Example AngelScript move implementation
/*
// Custom character move script
class CustomFireball : IMove
{
    float damage = 25.0f;
    float speed = 800.0f;
    
    void Execute(Character@ character)
    {
        // Create projectile
        Projectile@ fireball = SpawnProjectile("Fireball");
        fireball.SetDamage(damage);
        fireball.SetSpeed(speed);
        fireball.SetDirection(character.GetForwardVector());
        
        // Play animation
        character.PlayAnimation("Cast_Fireball");
        
        // Consume special meter
        character.ConsumeSpecialMeter(15.0f);
    }
}
*/
```

### Mod Asset Pipeline

We created a comprehensive asset pipeline that allows modders to create custom characters, stages, and effects while ensuring they integrate seamlessly with the base game:

```cpp
// Mod asset validation and loading
class RAGEBGC_API UModAssetManager : public UEngineSubsystem
{
    GENERATED_BODY()

public:
    UPROPERTY(BlueprintReadOnly, Category = "Modding")
    TArray<FModInfo> LoadedMods;
    
    UFUNCTION(BlueprintCallable, Category = "Modding")
    bool ValidateModAssets(const FString& ModPath);
    
    UFUNCTION(BlueprintCallable, Category = "Modding")
    UClass* LoadModCharacterClass(const FString& ModName, const FString& CharacterName);
    
    UFUNCTION(BlueprintCallable, Category = "Modding")
    UWorld* LoadModStage(const FString& ModName, const FString& StageName);

protected:
    bool ValidateCharacterAssets(const FString& CharacterPath);
    bool ValidateScriptSafety(const FString& ScriptContent);
    void SandboxModExecution(const FString& ModPath);
    
private:
    TMap<FString, TSharedPtr<FModSandbox>> ModSandboxes;
};

USTRUCT(BlueprintType)
struct RAGEBGC_API FModInfo
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadOnly)
    FString Name;
    
    UPROPERTY(BlueprintReadOnly)
    FString Version;
    
    UPROPERTY(BlueprintReadOnly)
    FString Author;
    
    UPROPERTY(BlueprintReadOnly)
    TArray<FString> Dependencies;
    
    UPROPERTY(BlueprintReadOnly)
    bool bIsVerified = false;
};
```

## Azure PlayFab Integration

### Backend Services

We integrated Azure PlayFab for user authentication, leaderboards, and matchmaking, ensuring a seamless online experience:

```cpp
// PlayFab integration manager
class RAGEBGC_API UPlayFabManager : public UGameInstanceSubsystem
{
    GENERATED_BODY()

public:
    DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnLoginComplete, bool, bSuccess);
    DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnMatchFound, const FString&, MatchId, const TArray<FString>&, PlayerIds);
    
    UPROPERTY(BlueprintAssignable)
    FOnLoginComplete OnLoginComplete;
    
    UPROPERTY(BlueprintAssignable)
    FOnMatchFound OnMatchFound;

public:
    UFUNCTION(BlueprintCallable, Category = "PlayFab")
    void LoginWithCustomId(const FString& CustomId);
    
    UFUNCTION(BlueprintCallable, Category = "PlayFab")
    void StartMatchmaking(const FString& QueueName);
    
    UFUNCTION(BlueprintCallable, Category = "PlayFab")
    void UpdatePlayerStatistics(const TMap<FString, int32>& Statistics);
    
    UFUNCTION(BlueprintCallable, Category = "PlayFab")
    void SubmitMatchResult(const FString& MatchId, const FMatchResult& Result);

protected:
    void OnPlayFabLoginSuccess(const PlayFab::ClientModels::FLoginResult& Result);
    void OnPlayFabLoginFailure(const PlayFab::PlayFabError& Error);
    void OnMatchmakingComplete(const PlayFab::MultiplayerModels::FGetMatchResult& Result);
    
private:
    TSharedPtr<PlayFab::IPlayFabClientAPI> ClientAPI;
    TSharedPtr<PlayFab::IPlayFabMultiplayerAPI> MultiplayerAPI;
    FString PlayerSessionTicket;
};
```

## Performance Optimization

### Frame Rate Consistency

Fighting games require consistent frame rates for competitive play. We implemented several optimization strategies:

```cpp
// Performance monitoring and optimization
class RAGEBGC_API UPerformanceManager : public UGameInstanceSubsystem
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Performance")
    float TargetFrameRate = 60.0f;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Performance")
    float FrameTimeThreshold = 16.67f; // 60 FPS in milliseconds

protected:
    TArray<float> FrameTimeHistory;
    int32 ConsecutiveSlowFrames = 0;
    
public:
    UFUNCTION(BlueprintCallable, Category = "Performance")
    void MonitorFrameRate();
    
    UFUNCTION(BlueprintCallable, Category = "Performance")
    void AdjustQualitySettings();
    
    UFUNCTION(BlueprintCallable, Category = "Performance")
    float GetAverageFrameTime() const;

private:
    void ReduceEffectQuality();
    void AdjustLumenSettings();
    void OptimizeCharacterLOD();
};
```

## Future Development

RAGE Battleground Chronicles continues to evolve with planned features including:

- **Enhanced Mod Tools**: Visual scripting for move creation
- **Tournament Mode**: Automated bracket management
- **Cross-Platform Play**: Console and PC compatibility
- **Spectator Features**: Replay system and live streaming integration

## Lessons Learned

Developing RAGE taught valuable lessons about modern game development:

1. **Network Architecture Matters**: Fighting games push networking to its limits
2. **Modding Requires Planning**: Extensibility must be designed from the ground up
3. **Performance is Non-Negotiable**: Consistent frame rates are essential for competitive games
4. **Community Engagement**: Early modding tools create passionate communities

The project demonstrates that Unreal Engine 5 is capable of handling complex, performance-critical games while providing the flexibility needed for extensive customization. The combination of modern graphics features with classic fighting game mechanics creates a unique experience that both players and modders can enjoy.

---

*Want to try RAGE Battleground Chronicles? Check out our [website](https://wdstudios.tech/rage-battleground-chronicles) or explore the modding tools on [GitHub](https://github.com/WatchDogStudios/RAGEBGC-UI).*
