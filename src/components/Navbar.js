const Navbar = ({auth,provider}) => {
    const a=auth.signInWithRedirect(provider)
    console.log(a)
    if (!auth.currentUser)
    {   
        console.log("if worked")
        return (
            <>
                <button onClick={ ()=>{ auth.signInWithRedirect(provider); console.log(auth)}}>Sign In APP </button>
            </>
        )
    }
    else
    {   console.log("else worked")
        return ( 
            <>
                <h1>Hello {auth.currentUser.displayName}</h1>
                <button onClick={ ()=>{auth.signOut()} } >Log out</button>
            </>
         );

    }
}
 
export default Navbar;