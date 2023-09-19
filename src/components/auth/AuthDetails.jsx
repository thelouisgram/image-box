import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        // Cleanup the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Sign out succeeded');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {authUser ? (
                <div>
                    <p>Signed In</p>
                    <button onClick={userSignOut}>Sign Out</button>
                </div>
            ) : (
                <p>Signed Out</p>
            )}
        </div>
    );
};

export default AuthDetails;
