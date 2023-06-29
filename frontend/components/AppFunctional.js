import React, { useEffect, useState } from "react";
import directions from "./directions";
import coordinates from "./coordinates";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi
const API = "http://localhost:9000/api/result";


export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);

  function getXY(index) {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    return coordinates[index];
  }

  function getXYMesaj(index) {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    return `Koordinatlar (${getXY(index)})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setIndex(initialIndex);
    setMessage(initialMessage);
    setSteps(initialSteps);
    setEmail(initialEmail);
  }

  function sonrakiIndex(index, yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    if (directions[index][yon] || directions[index][yon] === 0) {
      return directions[index][yon];
    }
    return false;
  }


  function ilerle(e) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const yon = e.target.id;
    const nextIndex = sonrakiIndex(index, yon);

    if(nextIndex === false){
      const sol = "Sola gidemezsiniz";
      const yukari = "Yukarıya gidemezsiniz";
      const sag = "Sağa gidemezsiniz";
      const asagi = "Aşağıya gidemezsiniz";
      if(yon === "left"){
        setMessage(sol);
      };
      if(yon === "up"){
        setMessage(yukari);
      };
      if(yon === "right"){
        setMessage(sag);
      };
      if(yon === "down"){
        setMessage(asagi);
      };
    } else {
      setSteps(steps + 1);
      setIndex(nextIndex);
      if(message){
        setMessage("");
      }
    }
  }

  function onChange(e) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    e.preventDefault();
    const {value} = e.target;
    setEmail(value)
  }

  function onSubmit(e) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    const {value} = e.target;
    e.preventDefault();
    e.stopPropagation();

    const data = { 
      "x": JSON.parse(coordinates[index][0]) , "y": JSON.parse(coordinates[index][2]), "steps": steps, "email": email 
    };

    axios.post(API, data)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err)=>{
        setMessage(err.response.data.message);
      });
      setEmail(initialEmail)
  }

  useEffect(()=>{
  },[index,steps,message,email])

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Koordinatlar (${getXY(index)})`}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={ilerle}>
          SOL
        </button>
        <button id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" onClick={ilerle}>
          SAĞ
        </button>
        <button id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="email girin" value= {email} onChange={onChange} ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
