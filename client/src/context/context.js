import { createContext, useEffect, useState } from "react";
export const Context = createContext()

export const ContextProvider = ({ children }) => {

    const [isLoading, setisLoading] = useState(false)
    const [allElections, setAllElections] = useState([])
    const [loginInfo, setloginInfo] = useState({})

    const [isLogedin, setisLogedin] = useState(false)

    const getAllElections = async () => {
        const res = await fetch("http://localhost:8000/getAllElections", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json()

        setAllElections(data.elections)
        // setisLoading(false)
        // console.log(`context: ${data}`);
    }

    const getVoterInfo = async () => {
        if (localStorage.getItem('id')) {
            const userid = localStorage.getItem('id')
            const res = await fetch("http://localhost:8000/getVoterInfo", {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid })
            });
            const data = await res.json()
            if (data?.user) {
                setloginInfo(data.user);
                setisLogedin(true);
                console.log("Voter Found:", data);
                return true; // voter found
            } else {
                return false; // no voter found
            }
        }
        return false;
    }
    const getCandidateInfo = async () => {
        if (localStorage.getItem('id')) {
            const userid = localStorage.getItem('id')
            const res = await fetch("http://localhost:8000/getCandidateInfo", {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid })
            });
            const data = await res.json()
            if (data?.user) {
                setloginInfo(data.user);
                setisLogedin(true);
                console.log("Candidate Found:", data);
            }
        }
    }

    useEffect(() => {
        getAllElections()
        const fetchUser = async () => {
            
            const isVoter = await getVoterInfo();
            if (!isVoter) {
                await getCandidateInfo();
            }
        }
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     // console.log("Updated loginInfo:", loginInfo);
    // }, [loginInfo]);

    return <Context.Provider value={{ allElections, loginInfo, setloginInfo, isLogedin, setisLogedin, }}>
        {children}
    </Context.Provider>
}