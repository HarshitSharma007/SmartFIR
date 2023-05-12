import {
    Card,
    Stack,
    StackDivider,
    Box,
    Heading,
    Text,
    CardHeader,
    SimpleGrid,
    CardBody,
  } from "@chakra-ui/react";
  import { Contract, providers, utils } from "ethers";
  import CaseStorage from "../abi/CaseStorage.json";
  import { useEffect, useState } from "react";
  import Layout from "../components/Layout";
  import { render } from "react-dom";
  import FIRBarChart from "../components/FIRBarChart";
  import Dummy from "../components/Dummy";
  import Dummy2 from "../components/Dummy2";
  import Dummy3 from "../components/Dummy3";
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '2rem',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    item: {
      margin: '1rem 0',
    },
    link: {
      color: '#000',
      fontSize: '1.5rem',
      padding: '1rem',
      border: '2px solid #000',
      borderRadius: '5px',
      transition: 'all 0.2s ease-in-out',
    },
  };

  const statusOptions = [
    { value: 'all', label: 'All'},
    { value: 'registered', label: 'Registered' },
    { value: 'under_investigation', label: 'Under Investigation' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed(Not Resolved)' },
    { value: 'withdrawn', label: 'Withdrawn' }
  ];
  
  export default function FirAnalytics() {
    const [show, setShow] = useState(null);
    const [barChartData, setBarChartData] = useState([]);
    const [allFir, setAllFir] = useState([]);
    const [filtered, setFiltered] = useState(allFir);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [status, setStatus] = useState();

    useEffect(() => {
      async function getFir() {
        const provider = new providers.Web3Provider(window.ethereum);
        const contract = new Contract(
          "0x4F7342b795909A11648EabbDBadED3c3A60AD17c",
          CaseStorage.abi,
          provider
        );
  
        const signer = await provider.getSigner();
       
        const array = await contract.connect(signer).casesReturn();
        let dataArray = [];
  
        for (let element of array) {
          const ipfs = await contract.connect(signer).getCase(element);
          const resp = await fetch(`https://${ipfs}.ipfs.nftstorage.link/`);
          const data = await resp.json();
          dataArray.push(data);
        }
  
        setAllFir(dataArray);
        setFiltered(allFir);
  
        setFiltered(allFir.filter((document) => {
          console.log(status);
          if (!status) {
            return true;
          }
    
          switch (status) {
            case 'Registered':
              return document.status === 'Registered';
              break;
            case 'Under Investigation':
              return document.status === 'Under Investigation';
              break;
            case 'Resolved':
              return document.status === 'Resolved';
              break;
            case 'Closed(Not Resolved)':
              return document.status === 'Closed(Not Resolved)';
              break;
            case 'Withdrawn':
              return document.status === 'Withdrawn';
              break;
            default:
              return true;
          }
        }));
      }
  
      getFir();
    }, []);

    async function handleSearch(event) {
      event.preventDefault();
  
      let firFiltered = allFir;
  
      if (startDate) {
        firFiltered = firFiltered.filter(document =>
          new Date(document.date) >= new Date(startDate)
        );
      }
    
      if (endDate) {
        firFiltered = firFiltered.filter(document =>
          new Date(document.date) <= new Date(endDate)
        );
      }
  
      setFiltered(firFiltered);
      console.log(filtered);
    }

    const showBarChart = async (typeOfBar) => {
      if(typeOfBar === 'district') {
        // const districts = [...new Set(filtered.map(item => item.addressDistrict))]; // Get a unique list of districts from the data
        // const chartData = districts.map(district => ({
        //   parameter: district,
        //   fir_count: filtered.filter(item => item.addressDistrict === district).length, // Count the number of items in each district
        // }));

        // setBarChartData(chartData);
        setShow(<Dummy2 />);
      } else if(typeOfBar === 'state') {
        // const states = [...new Set(filtered.map(item => item.addressState))]; // Get a unique list of states from the data
        // const chartData = states.map(state => ({
        //   parameter: state,
        //   fir_count: filtered.filter(item => item.addressState === state).length, // Count the number of items in each district
        // }));

        // setBarChartData(chartData);
        setShow(<Dummy3 />);
      } else {
        setShow(<Dummy />);
      }
    }

    return (
    <Layout>
      <div style={styles.container}>
              <br/>
        <h1 style={styles.title}>What would you like to do?</h1>
        <ul style={{display:"flex", gap :"15px"}}>
          <li style={styles.item}>
            <button onClick={() => showBarChart('district')} style={styles.link}>
              FIRs by District
            </button>
          </li>
          <li style={styles.item}>
            <button onClick={() => showBarChart('state')} style={styles.link}>
              FIRs by State
            </button>
          </li>
          <li style={styles.item}>
            <button onClick={() => showBarChart('month')} style={styles.link}>
              FIRs by Month
            </button>
          </li>
        </ul>
      </div>
      <div>
        {show}
      </div>
    </Layout>
    );
  }
  