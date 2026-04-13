import { beforeEach, describe } from "vitest";
import reactSupabase from "../../src/supabaseClient";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import { ProfileProvider, useProfile } from "../../src/hooks/ProfileContext";
import { AuthProvider } from "../../src/hooks/AuthContext";

const TEST_USER_ID = 'f5081cf9-3e27-48ae-8465-48f991ba1895';
const authValue = {
    user: {
        user_id: TEST_USER_ID
    }
}
function ProfileProbe(){    
    const {profileLoaded, profile} = useProfile();
                
    return (
        <>
            <div data-testid="profile-loaded">{String(profileLoaded)}</div>
            <div data-testid="has-profile">{String(!!profile)}</div>
            {/*<div data-testid="has-first-name">{String(profile.first_name)}</div>
            <div data-testid="has-last-name">{String(profile.last_name)}</div>
            <div data-testid="has-nickname">{String(profile.nickname)}</div>*/}
        </>
    )
}

describe('ProfileProvider no mock integration test', () => {
    beforeEach(async () => {
                
        cleanup();
        localStorage.clear();
        sessionStorage.clear();
        await reactSupabase.auth.signOut();

        const {error} = await reactSupabase.auth.signInWithPassword({
            email: process.env.TEST_USER_EMAIL,
            password: process.env.TEST_USER_PW
        });

        expect(error).toBeNull();

    })
    it('Profile Provider hydrates when loaded', async ()=>{
        render(
            <AuthProvider>
                <ProfileProvider>
                    <ProfileProbe />
                </ProfileProvider>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('profile-loaded')).toHaveTextContent('true');
        });

        expect(screen.getByTestId('has-profile')).toHaveTextContent('true');
        // add others when this is confirmed working
    })
})