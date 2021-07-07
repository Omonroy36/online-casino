import {useState ,useEffect} from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Content from '../components/Content';

const App = () =>  {
  const [balance, setBalance] = useState<number>(20);

  const handleBalance = (value: number) => {
    setBalance(value);
  }

  useEffect(()=> {
    const userBalance = localStorage.getItem("balance");
    if(userBalance) setBalance(Number(userBalance));
  }, [])

  return (
    <div className="App">
      <Header balance={balance}/>
      <Content handleBalance={handleBalance} balance={balance}/>
      <Footer />
    </div>
  );
}

export default App;
