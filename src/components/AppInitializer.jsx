import { useCallback, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useProfile } from "../hooks/ProfileContext";

export default function AppInitializer({children}){
    const auth = useAuth();
    const profile = useProfile();

    const allLoaded = auth.authLoaded && profile.profileLoaded;
    if(allLoaded)

    console.log(`Auth: ${auth.authLoaded} : Profile: ${profile.profileLoaded} : ${allLoaded}`);

    const reloadAll = useCallback(async () => {
        await Promise.all([
            auth.reloadAuth ? auth.reloadAuth() : Promise.resolve(),
            profile.reloadProfile ? profile.reloadProfile() : Promise.resolve(),
        ])
    }, [auth.reloadAuth, profile.reloadProfile]);

    return (<>{children}</>)
}