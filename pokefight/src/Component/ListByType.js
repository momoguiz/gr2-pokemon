import {useParams} from "react-router-dom"
import {useState,useEffect} from "react"
import axios from 'axios'
import PokeDex from "./PokeDex"

const ListByType = () => {

    const {type} = useParams()
    const [listByType,setListByType] = useState([])
    const [displayPokedex,setDisplayPokedex] = useState(false)
    const [slice, setSlice] = useState({ start: "0", end: "5" });
    const [id,setId] = useState("")
    const [data,setData] = useState([])

    const fetchData = async () => {
        try {
          const callData = await axios.get(
            `https://pokeapi.co/api/v2/type/${type}`
          );
          setListByType(callData.data.pokemon);
    
        } catch (err) {
          console.log(err);
        }
      };

    
    useEffect(()=>{
        fetchData()
    },[])
    
    const changeSlicePlus = () => {
       parseInt(slice.end) + 5 < listByType.length
        ? setSlice((prevState) => ({
            ...prevState,
            start: parseInt(slice.start) + 5,
            end: parseInt(slice.end) + 5,
          }))
        : setSlice((prevState) => ({
            ...prevState,
            start: "0",
            end: "5",
          }));
    };
  
    const changeSliceMoins = () => {
      if (parseInt(slice.start) - 5 >= 0) {
        setSlice((prevState) => ({
          ...prevState,
          start: parseInt(slice.start) - 5,
          end: parseInt(slice.end) - 5,
        }));
      } else if (parseInt(slice.start) === 0) {
        return;
      } else {
        setSlice((prevState) => ({
          ...prevState,
          start: listByType.length - 5,
          end: listByType.length,
        }));
      }
    };
  
    const fetchDataDetails = async (id) => {
      try {
          const callData = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          setData(callData.data);
    
        } catch (err) {
          console.log(err);
        }
      };
   
      console.log(data)

    return (
    <div>
    <div className="cardPoke">
    <button onClick={()=> changeSliceMoins()}>-</button>
    {listByType.slice(slice.start,slice.end).map((e,i) =>
    <>
    <div key={i} className="flip-card" onClick={() => setDisplayPokedex(!displayPokedex) & fetchDataDetails(e.pokemon.url.substr(34, e.pokemon.url.length).replace("/",""))}>
    <div className="flip-card-inner">
        <div className="flip-card-front">
            <p className="title">{e.pokemon.name}</p>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.pokemon.url.substr(34, e.pokemon.url.length).replace("/","")}.png`} alt="logoPokemon"
              
            /> 
           
        </div>
    </div>
    </div>
    
    </>
    )}
    <button  onClick={()=> changeSlicePlus()}>+</button>
    {displayPokedex && <PokeDex data={data.data} type={data.types}/>}
    </div>
    </div>
    
    
    )
}

export default ListByType