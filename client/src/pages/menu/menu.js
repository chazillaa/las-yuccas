import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  // toggle auth for menu
  const [isLogged, showIsLogged] = useState(false);

  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);
  function checkStorage() {
    if (localStorage.getItem("token")) {
      showIsLogged(true);
    } else {
      showIsLogged(false);
    }
  }
  // toggle auth for menu


  useEffect(() => {
    const menuData = async () => {
      const res = await axios.get("http://localhost:3001/api/menu");
      console.log(res.data);
      setMenu(res.data);
    };
    menuData();
  }, []);

  const addToCart = (event) => {
    event.preventDefault();
    console.log(event);
    const postCart = async (data) => {
      try {
        const url = `http://localhost:3001/api/cart`;
        const { data: res } = await axios.post(url, data, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
      } catch (err) {
        console.log(err);
      }
    };

    const itemData = {
      _id: event.target.parentNode.dataset.itemId,
      quantity: 1,
    };

    postCart(itemData);
  };

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menu.map((item) => (
          <li key={item._id} data-item-id={item._id}>
            {item.name} {item.price}
            <img src={`data:image/png;base64,${item.image}`} alt="a" />
            <br />
            {isLogged ? (
              <button onClick={addToCart}> ADD </button>
            ) : (
              <div></div>
            )}
            {/* <button onClick={addToCart}> ADD </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;

//<Menu item={item}/>