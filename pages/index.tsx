import type { NextPage } from "next";

import { useState } from "react";
import { useRouter } from "next/router";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";

const AUTHENTICATED_ADDRESSES = [
  "0xbB077CbEE8F01587Eff700D0d7dBAE3F25Dc3560".toLowerCase(),
  "0x52bB3A42564c0Df72ECB111D24BE82C614497A22".toLowerCase(),
  "0x1d1efc63bf932c1daf23c01fd1e18dd1bbe1e78a".toLowerCase(),
  "0xd76560aEfA91CBFE9a1Efd1D856bfC2001928C97".toLowerCase(),
  "0x6855Cc76b0F1F87a92f204346647aDB557b28860".toLowerCase(),
  "0xCc5FD657B7FFF0F491334E665De01a8bC883Ea19".toLowerCase()
]


const Home: NextPage = () => {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);

        if (AUTHENTICATED_ADDRESSES.includes(accounts[0])) {
          var inTenHours = new Date(new Date().getTime() + 10 * 60 * 1000 * 60);
          setCookie("loggedin", "true", { expires: inTenHours });

          window.alert('Congrats, you have been logged in!!');
          router.push("/fir");
        } else {
          removeCookie("loggedin");
          window.alert('Sorry, but you are not authorised. Try login on public portal');
        }
      } catch (error) {
        window.alert('Error connecting.');
      }
    } else {
      window.alert('Please install metamask.');
    }

    // 0x52bB3A42564c0Df72ECB111D24BE82C614497A22
  }

  async function requestAccountAsPublic() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);
        var inTenHours = new Date(new Date().getTime() + 10 * 60 * 1000 * 60);
        setCookie("loggedinaspublic", "true", { expires: inTenHours });

        window.alert('Congrats, you have been logged in!!');
        router.push("/fir");
      } catch (error) {
        window.alert('Error connecting.');
      }
    } else {
      window.alert('Please install metamask.');
    }
  }

  return (
    <div className="pl-2 font-poppins">
      {/* <nav classNameName="flex items-center justify-between flex-wrap bg-teal-500 p-4">
      <div classNameName="flex items-center flex-shrink-0 text-white mr-10">
        <span classNameName="font-bold text-xl tracking-tight">DeFIR</span>
      </div>
      <div classNameName="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div classNameName="text-sm lg:flex-grow">
          <a href="/fir" classNameName="block mt-4 lg:inline-block lg:mt-0 text-teal-50 hover:text-white mr-10">
            FIR Registeration Portal
          </a>
          <a href="/evidence" classNameName="block mt-4 lg:inline-block lg:mt-0 text-teal-50 hover:text-white mr-10">
            Evidence Storage
          </a>
          <a href="/firCards" classNameName="block mt-4 lg:inline-block lg:mt-0 text-teal-50 hover:text-white  mr-10">
            FIR
          </a>
          <a href="/evidenceCards" classNameName="block mt-4 lg:inline-block lg:mt-0 text-teal-50 hover:text-white  mr-10">
            Evidences
          </a>
        </div>
        <Button onClick={requestAccount} size='lg' colorScheme='blue' mt='6px'>
          Connect
        </Button>
      </div>
    </nav>

    <div classNameName="h-27 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">   
    
    <center>
    <StatGroup>
      <Stat>
        <StatLabel>FIRs REGISTERED</StatLabel>
        <StatNumber>345,670</StatNumber>
        <StatHelpText>
          <StatArrow type='increase' />
          23.36%
        </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Evidences Stored</StatLabel>
        <StatNumber>45</StatNumber>
        <StatHelpText>
          <StatArrow type='decrease' />
          9.05%
        </StatHelpText>
      </Stat>
    </StatGroup>
    </center>

    
      <main classNameName={styles.main}>

      <Heading size='lg' fontSize='50px'>
        Decentralized FIR 
      </Heading>
        <br/> */}

      {/* <Link href="/fir">FIR REGISTERATION PORTAL</Link> */}
      {/* <Link href="/evidence">Evidence Storage</Link> */}
      {/* <Link href="/evidenceCards">Evidence Cards</Link> */}

      {/* <Heading noOfLines={1}>
          Address : {walletAddress}
        </Heading>
      </main>

      <footer classNameName={styles.footer}>
        <p>Decentralized FIR system - Main project</p>
      </footer>
    </div> */}
      {/* <nav className="sm:px-4 py-2.5 opacity-100">
        <div className="container flex px-16 flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-black">
              DFIR
            </span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-row">
              <li className="mt-2">
                <a href="/fir" className="mx-5 my-5">
                  FIR Registeration Portal
                </a>
              </li>
              <li className="mt-2">
                <a href="/dashboard" className="mx-5 my-5">
                  Dashboard
                </a>
              </li>
              <li className="mt-2">
                <a href="/evidence" className="mx-5 my-5">
                  Evidence storage
                </a>
              </li>
              <li className="mt-2">
                <a href="/firCards" className="mx-5 my-5">
                  FIR
                </a>
              </li>
              <li className="mt-2">
                <a href="/evidenceCards" className="mx-5 my-5">
                  Evidences
                </a>
              </li>
              <li>
                <button
                  onClick={requestAccount}
                  className="block py-2 pl-3 pr-4 text-black border-2 border-black translate-x-6"
                >
                  {walletAddress === ""
                    ? "Connect Wallet"
                    : "Logged in as " +
                      walletAddress.substring(0, 8) +
                      "..."}{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      <div className="flex flex-wrap h-screen flex-row justify-between">
        <div className="flex flex-col w-6/12">
          <div className="flex flex-col justify-center px-20 gap-4">
         <div style ={{marginLeft:"-32px"}}>
               <img src="logo4.png" alt="logo" height="300px" width="300px" />
        </div>
  



            <h1 className="text-7xl font-semibold text-[#131321] mt-1 leading-[90px]">
              <span className="font-black text-[#3661EB]">Decentralized</span> Crime Management System
            </h1>
            <button
              className="bg-[#3661EB] h-10 mt-3  text-slate-100 font-bold rounded-md"
              style={{width:"40%" }}
              onClick={requestAccount}
            >
              Login as Police
            </button>
            <button
              className="bg-[#3661EB] h-10 mt-3  text-slate-100 font-bold rounded-md"
              style={{width:"40%"}}
              onClick={requestAccountAsPublic}
            >
              Login as Public
            </button>
           
          </div>
        </div>
        <div className="w-6/12 bg-[#004aad] h-screen overflow-hidden" style ={{display:"flex", justifyContent:"center"}}>
          <img src="logo5.png" className=" object-contain" height="400px" width="400px" alt="cover"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
