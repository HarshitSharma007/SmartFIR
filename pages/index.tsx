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
        router.push("/publicFir");
      } catch (error) {
        window.alert('Error connecting.');
      }
    } else {
      window.alert('Please install metamask.');
    }
  }

  return (
    <div className="pl-2 font-poppins">
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
