import CaseStorage from "../abi/CaseStorage.json";
import { useState } from "react";
import { useRouter } from "next/router";
import { NFTStorage, File, Blob } from "nft.storage";
import { Contract, providers, utils } from "ethers";
import Layout from "../components/Layout";
import Otp from "../components/Otp";

function isNumeric(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

export default function FIR() {
  const [firId, setFirId] = useState<string>();
  const [nameC, setNameC] = useState<string>();
  const [nameA, setNameA] = useState<string>();
  const [detName, setdetName] = useState<string>();
  const [parent, setParent] = useState<string>();
  const [addressLocality, setAddressLocality] = useState<string>();
  const [addressDistrict, setAddressDistrict] = useState<string>();
  const [addressState, setAddressState] = useState<string>();
  const [addressPin, setAddressPin] = useState<string>();
  const [contact, setContact] = useState<string>();
  const [rel, setRel] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [ipc, setIpc] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [content, setContent] = useState<string>();
  const [otpShow, setOtpShow] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');

  const router = useRouter();
  
  const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRmODVDQTY3NzkzNjYxYWM2MDFDNjZkMDdjNDc0REFDZGY2ZUE3RTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MTM4MzIwMDg2OCwibmFtZSI6IkhhcnNoaXQifQ.AZLbputyfky-kZWrRRsQjQCGosIKOWAblEhSrOJN14o",  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const obj = {
      firId,
      nameA,
      nameC,
      detName,
      parent,
      addressLocality,
      addressDistrict,
      addressState,
      addressPin,
      contact,
      rel,
      desc,
      ipc,
    };

    const jsonData = {
      firId: firId,
      date: new Date(),
      nameA: nameA,
      nameC: nameC,
      detName: detName,
      parent: parent,
      addressLocality: addressLocality,
      addressDistrict: addressDistrict,
      addressState: addressState,
      addressPin: addressPin,
      contact: contact,
      rel: rel,
      desc: desc,
      ipc: ipc,
    };
    const blob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });
    const cid = await client.storeBlob(blob);
    console.log(cid);
    setContent(cid);
    
    const provider = new providers.Web3Provider(window.ethereum);
    const contract = new Contract(
      "0x4F7342b795909A11648EabbDBadED3c3A60AD17c",
      CaseStorage.abi,
      provider
      );
      // console.log(provider)
      const signer = await provider.getSigner();
      
      const tx = await contract.connect(signer).setCase(firId, cid);
    console.log(utils.id(firId));
    const receipt = await tx.wait();
    console.log(receipt);

    const ab = await contract.connect(signer).getCase(firId);
    console.log(ab);
    window.location.href = `mailto:${email}?subject=FIR%20Content%20Identifier&body=CID=${content}`
    window.alert("Success");
    router.push("/firCards");
  };

  const GenerateIPCs = async (e: any) => {
    fetch(`https://api-sk9o.onrender.com/title/${desc}` )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setIpc(data[0].Section);
    });
  };

  const _getCode = async() => {
    const e = contact;
    const resp = await fetch(`/api/sendOTP?phonenumber=${e}&channel=${"sms"}`, {
      method: "GET"
    });
    console.log(resp);

    const data = await resp.json();
    console.log(data);
  };

  const _verifyCode = async () => {
    const e = contact;
    const resp = await fetch (`/api/verifyOTP?phonenumber=${e}&code=${otp}`, {
        method: "GET"
    });
    const data = await resp.json();
    console.log(data);
    return data.valid;
  }

  return (
    <Layout>
      <div className="ml-64 font-poppins">
        <div className="flex flex-wrap h-screen flex-row justify-between">
          <div className="w-10/12">
            <div className="ml-10 mt-14">
              <h1 className="text-4xl font-bold text-[#212121] mt-4">
                FIR Registration
              </h1>
              <p className="text-xl font-light mt-2 text-[#98999E]">
                Fill in the details regarding the report
              </p>
              <br />
              <div className="pt-4 mt-4 space-y-2 border-t border-slate-300"></div>
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6 mt-2">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      CASE ID
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="firId"
                      type="text"
                      value={firId}
                      onChange={(e) => setFirId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      NAME OF COMPLAINTENT
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="ID"
                      type="text"
                      value={nameC}
                      onChange={(e) => setNameC(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      EMAIL OF POLICE STATION
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="ID7"
                      type="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      APPLICANT DETAILED NAME
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="ID2"
                      type="text"
                      value={detName}
                      onChange={(e) => setdetName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      APPLICANT DETAILED PARENT/HUSBAND NAME
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="ID3"
                      type="text"
                      value={parent}
                      onChange={(e) => setParent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  {otpShow ? 
                    (<Otp otp={otp} setOtp={(val) => {setOtp(val)}} />)
                    :
                    (
                    <div className="w-full px-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          APPLICANT CONTACT NUMBER
                        </label>
                      <input
                        className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        id="ID5"
                        type="string"
                        pattern="/^(\+\d{1,3}[- ]?)?\d{10}$/"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        disabled={otpVerified}
                        style={{'width': "80%"}}
                      />
                    </div>
                    )
                  }<button
                  className="shadow bg-[#3661EB] my-2 text-slate-100 focus:shadow-outline focus:outline-none text-white font-normal py-1 px-2 rounded"
                  style={{'marginLeft': "-1px"}}
                  disabled={(contact?.length!==10) || !isNumeric(contact) || (otpShow && otp?.length!==6)}
                  type="button"
                  onClick={async () => {
                    if(otpShow) {
                      setOtpVerified(await _verifyCode());
                      setOtpShow(false);
                    } else {
                      await _getCode();
                      setOtpShow(true);
                    }
                  }}
                >
                  {otpVerified ? "Verified" : "Verify"} 
                </button>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      APPLICANT LOCALITY-VILLAGE
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-10"
                      id="ID4"
                      type="text"
                      value={addressLocality}
                      onChange={(e) => setAddressLocality(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      APPLICANT DISTRICT
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-10"
                      id="ID4"
                      type="text"
                      value={addressDistrict}
                      onChange={(e) => setAddressDistrict(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      APPLICANT STATE
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-10"
                      id="ID4"
                      type="text"
                      value={addressState}
                      onChange={(e) => setAddressState(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      APPLICANT PINCODE
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-10"
                      id="ID4"
                      type="text"
                      value={addressPin}
                      onChange={(e) => setAddressPin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      NAME OF ACCUSED
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="ID1"
                      type="text"
                      value={nameA}
                      onChange={(e) => setNameA(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      APPLICANT RELATIONSHIP WITH ACCUSED
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="ID6"
                      type="text"
                      value={rel}
                      onChange={(e) => setRel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      FIR DESCRIPTION
                    </label>
                    <textarea
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-48 resize-none"
                      id="Desc"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                    <button
                    type="button"
                      className="shadow border-2 border-[#3661EB] w-48 h-12 my-4 text-slate-100focus:shadow-outline focus:outline-none text-[#3661EB] font-normal py-2 px-4 rounded"
                      onClick= {GenerateIPCs}
                      
                    >
                      Generate IPC
                    </button>
                  </div>
                </div>
                {/* {<div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      IPC SECTIONS
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="ipc"
                      type="text"
                      value={ipc}
                      onChange={(e) => setIpc(e.target.value)}
                    />
                  </div>
                </div>} */}
                <div className="flex flex-row">
                  <div className="flex justify-end w-full gap-4 md:flex md:items-center pr-40">
                    <button
                    type="button"
                      className="shadow border-2 border-[#3661EB] w-48 h-12 my-4 text-slate-100focus:shadow-outline focus:outline-none text-[#3661EB] font-normal py-2 px-4 rounded"
                      onClick={() =>
                        (window.location.href = `mailto:${email}?subject=FIR%20Content%20Identifier&body=CID=${content}`)
                      }
                    >
                      Send email
                    </button>
                    <div className="flex md:flex md:items-center">
                      <div className="">
                        <button
                          className="shadow bg-[#3661EB] w-48 h-12 my-4 text-slate-100focus:shadow-outline focus:outline-none text-white font-normal py-2 px-4 rounded"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
