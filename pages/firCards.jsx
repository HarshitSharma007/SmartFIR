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
import useFirStore from "../stores/firStore";
import FIRBarChart from "../components/FIRBarChart";

const statusOptions = [
  { value: 'all', label: 'All'},
  { value: 'registered', label: 'Registered' },
  { value: 'under_investigation', label: 'Under Investigation' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed(Not Resolved)' },
  { value: 'withdrawn', label: 'Withdrawn' }
];

export default function FirCards() {
  // const [arrFir, setArrFir] = useState<any[]>([]);
  const data = [
    { frequency: 0, magnitude: 0 },
    { frequency: 1, magnitude: 0.2 },
    { frequency: 2, magnitude: 0.5 },
    { frequency: 3, magnitude: 0.8 },
    { frequency: 4, magnitude: 1 },
  ];
 
  const [allFir, setAllFir] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('All');

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
      setFiltered(dataArray);

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

    if(searchQuery) {
      firFiltered = allFir.filter(record =>
        record.firId.toLowerCase().includes(searchQuery) ||
        record.addressDistrict.toLowerCase().includes(searchQuery) ||
        record.addressState.toLowerCase().includes(searchQuery) ||
        record.detName.toLowerCase().includes(searchQuery) ||
        record.nameC.toLowerCase().includes(searchQuery)
      );
    }

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

  return (
    <Layout>
      <div className="font-poppins ml-64">
        <div className="flex flex-wrap h-screen flex-row justify-between">
          <div className="w-10/12">
            <div className="ml-10 mt-14">
                <h1 className="text-4xl font-bold mt-4">FIR Search</h1>
                <p className="text-xl font-light mt-2 text-[#98999E]">
                Search for saved FIR data
                </p>
                <br />
                <form onSubmit={handleSearch}>
                  <label htmlFor="startDate">Keyword: </label>
                  <input 
                    type="search" 
                    name="searchQuery"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 px-8 py-2"
                    placeholder="Search FIRs..." 
                  />
                  <label htmlFor="startDate"> Start Date: </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    style={{
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '16px',
                      color: '#333',
                      backgroundColor: '#fff',
                      boxShadow: 'none',
                      outline: 'none',
                    }}
                  />
                  <label htmlFor="endDate"> End Date: </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    style={{
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '16px',
                      color: '#333',
                      backgroundColor: '#fff',
                      boxShadow: 'none',
                      outline: 'none',
                    }}
                  />

                  <button 
                    type="submit"
                    className="text-white absolute bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Search
                  </button>
                </form>
              <br/>
              <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    style={{
                      flex: 1,
                      padding: '5px',
                      fontSize: '12px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      borderBottom: `3px solid ${status === option.value ? '#333' : 'transparent'}`,
                      fontWeight: status === option.value ? 'bold' : 'normal',
                    }}
                    onClick={() => setStatus(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
              <br/>
              <div className="bg-white h-screen">
                <div className="mx-10 my-8">
                  <SimpleGrid
                    spacing={10}
                    templateColumns="repeat(auto-fill, minmax(300px, 4fr))"
                  >
                    {filtered.map((evi) => (
                      <Card key={evi.firId}>
                        <CardHeader>
                          <Heading size="md">FIR ID {evi.firId}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Box overflowX="auto" overflowY="auto" height="200px">
                            <Stack divider={<StackDivider />} spacing="4">
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Police Station
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {evi.addressDistrict} Police Station
                                </Text>
                              </Box>

                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Name of the Complainant
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {evi.nameC}
                                </Text>
                              </Box>

                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Person Accussed
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {evi.nameA}
                                </Text>
                              </Box>

                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Description of Crime
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {evi.desc}
                                </Text>
                              </Box>

                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Applicant Detail
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {evi.detName}
                                </Text>
                              </Box>

                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Applicant&apos;s Parent/Husband
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {evi.parent}
                                </Text>
                              </Box>

                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Applicant&apos;s Address
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {evi.addressLocality}, {evi.addressDistrict}, {evi.addressState}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  {evi.addressPin}
                                </Text>
                              </Box>

                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Applicant&apos;s Contact detail
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {evi.contact}
                                </Text>
                              </Box>

                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Applicant&apos;s Relationship with Accussed
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {evi.rel}
                                </Text>
                              </Box>
                            </Stack>
                          </Box>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
