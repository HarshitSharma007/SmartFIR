import CaseStorage from "../abi/CaseStorage.json";
import { useState } from "react";
import { Web3Storage } from "web3.storage";
import { Contract, providers, utils } from "ethers";
import { AnyNsRecord } from "dns";
import Layout from "../components/Layout";
import axios from 'axios';

export default function Evidence() {
  
  const [caseid, setCaseid] = useState<string>();
  const [files, setFiles] = useState([]);
  const [fileName,setFileName]=useState("");
  const [file,setFile]=useState("");
  const [desc, setDesc] = useState<string>();
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFiles(e.target.files);
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  // const client =  new NFTStorage({ token: process.env.TOKEN })
  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBDODZiOWMyZjMzNWYxNjUwMWQ0OEE2M2IxQmRmRDE1QjFGRjJCMjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY2NTE3NDUxNDcsIm5hbWUiOiJGSVIifQ.vA-ohq0boeAc_wvjsabh3S1Yf2b53TgJETMb6_bdMTo",
  });

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const provider = new providers.Web3Provider(window.ethereum);
    const contract = new Contract(
      "0x4F7342b795909A11648EabbDBadED3c3A60AD17c",
      CaseStorage.abi,
      provider
    );
    // console.log(provider)
    const signer = await provider.getSigner();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `f8f2869444692d497d0f`,
            pinata_secret_api_key: `bc7e0727a050e61aff96ac97f2f26a6532b89204d71e9b359835c27d7400e05c`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        const obj = { caseId: caseid, desc: desc, cid:ImgHash };
        const tx = await contract.connect(signer).setEvidence(caseid, obj);
        const receipt = await tx.wait();
        console.log(receipt);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const cid = await client.put(files, {
      name: caseid,
    });

    console.log(cid);

    // const res = await client.get(cid);
    // const file = await res.files();
    // for (const f of file) {
    //     console.log(`${f.cid} ${f.name} `);
    // }
    // let content = []
    // for await (const upload of client.list()) {
    //         content.push(upload.name)
    //         content.push(upload.cid)
    // }
    // console.log(content)
    const obj = { caseId: caseid, cid: cid, desc: desc };
    const provider = new providers.Web3Provider(window.ethereum);
    const contract = new Contract(
      "0x4F7342b795909A11648EabbDBadED3c3A60AD17c",
      CaseStorage.abi,
      provider
    );
    // console.log(provider)
    const signer = await provider.getSigner();

    const tx = await contract.connect(signer).setEvidence(caseid, obj);
    const receipt = await tx.wait();
    console.log(receipt);

    // for await (const upload of client.list()) {
    //     console.log(`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`)
    // }

    const ab = await contract.connect(signer).getEvidence(caseid);
    console.log(ab);
    alert("Success");
  }
  // const handleSubmit = async (e:any) => {
  //     e.preventDefault()
  // const obj = {
  //     name:caseid,
  //     description:desc,
  //     image: new File([img], img as any, { type: 'image/png' })

  // }
  // const metadata = await client.store(obj)
  // console.log('Metadata URI: ', metadata)

  // const jsonData = {caseid:caseid,desc:desc,img:img};
  // const blob = new Blob([img]);
  // console.log(img);

  // const cid = await client.storeBlob(blob)
  // console.log(cid)

  // const provider = new providers.Web3Provider(window.ethereum)
  // const contract = new Contract("0x628f0887dF785315a560d2248a579627FCa65056", CaseStorage.abi, provider)
  // console.log(provider)
  // const signer = await provider.getSigner();
  // const tx = await contract.connect(signer).setEvidence(utils.id(caseid), cid)
  // const receipt = await tx.wait()
  // console.log(receipt)
  //}
  return (
    <Layout>
      <div className="font-poppins ml-64">
        <div className="flex flex-wrap h-screen flex-row justify-between">
          <div className="w-10/12">
            <div className="ml-10 mt-14">
              <h1 className="text-4xl font-bold mt-4">Evidence Storage</h1>
              <p className="text-xl font-light mt-2 text-[#98999E]">
                Fill in the details regarding the report
              </p>
              <br />
              <div className="pt-4 mt-4 space-y-2 border-t border-slate-300"></div>
              <form className="w-ful" onSubmit={handleSubmit2}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 pt-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      CASE ID
                    </label>
                    <input
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="ID"
                      type="text"
                      value={caseid}
                      onChange={(e) => setCaseid(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-11/12 flex flex-col">
                    <label
                      htmlFor="filepicker"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      PICK FILES TO STORE
                    </label>
                    <input
                      type="file"
                      id="filepicker"
                      name="fileList"
                      onChange={retrieveFile}
                      multiple
                      required
                    />
                  </div>
                </div>
                <span className="textArea">Image: {fileName}</span>
                <div className="flex flex-wrap -mx-3 my-7">
                  <div className="w-full px-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      EVIDENCE DESCRIPTION
                    </label>
                    <textarea
                      className="appearance-none w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-48 resize-none"
                      id="Desc"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end md:flex md:items-center">
                  <div className="mr-40">
                    <button
                      className="shadow bg-[#3661EB] w-48 h-12 my-4 text-slate-100focus:shadow-outline focus:outline-none text-white font-normal py-2 px-4 rounded"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                  <div className=""></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
