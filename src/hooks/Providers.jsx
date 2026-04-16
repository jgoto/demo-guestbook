import { AuthProvider } from "./AuthContext";
import { ProfileProvider } from "./ProfileContext";
import { PostProvider } from "./PostContext";
import AppInitializer from "../components/AppInitializer";

export function Providers({children}){
    return (
        <AuthProvider>
            <ProfileProvider>
                <PostProvider>
                    <AppInitializer>
                        {children}
                    </AppInitializer>
                </PostProvider>
            </ProfileProvider>
        </AuthProvider>
    )
}