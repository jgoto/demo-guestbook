import { beforeEach, describe } from "vitest";
import reactSupabase from "../../src/supabaseClient";
import {render, screen, waitFor, cleanup} from '@testing-library/react';
import { AuthProvider, useAuth } from "../../src/hooks/AuthContext";

function AuthProbe(){
    const { loggedIn, authLoaded, user } = useAuth();

    return (
        <>
            <div data-testid="auth-loaded">{String(authLoaded)}</div>
            <div data-testid="logged-in">{String(loggedIn)}</div>
            <div data-testid="has-user">{String(!!user)}</div>
            <div data-testid="has-email">{String(user?.email ?? 'none')}</div>
        </>
    )
}

describe('AuthProvider no mock integration tests', () => {
    beforeEach(async () => {
        await reactSupabase.auth.signOut();

        const {error} = await reactSupabase.auth.signInWithPassword({
            email: process.env.TEST_USER_EMAIL,
            password: process.env.TEST_USER_PW
        });

        expect(error).toBeNull();
    })
    it('AuthProvider hydrates into logged in state', async () => {
        render(
            <AuthProvider>
                <AuthProbe />
            </AuthProvider>
        )

        await waitFor(() => {
            expect(screen.getByTestId("auth-loaded")).toHaveTextContent("true")
        });

        expect(screen.getByTestId("logged-in")).toHaveTextContent("true");
        expect(screen.getByTestId("has-user")).toHaveTextContent("true");
        expect(screen.getByTestId("has-email")).toHaveTextContent(process.env.TEST_USER_EMAIL);
    })
})

