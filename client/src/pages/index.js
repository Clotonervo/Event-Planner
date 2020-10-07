import React from "react";
import Layout from "../components/Layout";
import EventCard from "../components/Common/EventCard"
import AddEventCard from "../components/Common/AddEventCard"
import Login from "../components/Login";
import {theme1, theme2} from "../resources/style-constants"

function login() {
  alert("Logging you in...");
}

var pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX///+6urrx8fG3t7fIyMi8vLz5+fna2tq/v7/e3t7i4uLs7Ozv7+/FxcX09PTn5+cpBFJlAAACQklEQVR4nO3dC46CMBRGYUqLvET3v9tBE6PxRUes/W85ZwHD/YJJEyB3qip9dRsa91gT2voHV09fHbx/4jvlfSjA2LtXvrPR9bkHXFv/znc2Gicel4Az8Zh7yFV1i0DnutxDrmlYvoXzTRxyj7miKQLo3JR7zM/bPTsGH2t2uQf9uDrmRzr/TO0eiggR6ocQoX4IEeqHEKF+CBHqhxChfggR6ocQoX4IEeqHEKF+CBHqhxChfggR6ocQoX4IEeqHEKF+CBHqhxChfggR6ocQoX4IEeqHEKF+CBHqhxChfggR6ocQoX4IEeqnJdzV32+IAjo3JLj2/e6pITT++0UCTwsUv14TbpekjV38MGbyvhsvwMXdhla77GQsFngh7nOPkbT9LAzl3sL5Jk7RZ5bV5rO2LVzYViH3DIkLVdx6Srs1Ve4JkofQfgjth9B+CO2H0H4I7YfQfgjth9B+G3hOU/6ztvKfl5b/zLuaSib6sIl3T+W/PyyYeP2/fGP3j68KrHT7Hn8D32Js4XuaNGl9E5UihAj1Q4hQP4QI9UOIUD+ECPVDiFA/hAj1Q4hQP4QI9UOIUD+ECPVDiFA/hAj1Q4hQP4QI9UOIUD+ECPVDiFA/hAj1Q4hQP4QI9UOIUD+ECPVDiFA/hAj1Q4hQP4QI9StfuItbrNn8ZqdTkqYo4ZR7zBUNMT9Tf792zFRdhLDLPeSqxuWb6MflP6Pc4k7G625Dq/XundE788D5UAwvFyh6H+wehbcd2vDsYGxCe/jB1f8Ayh9LytK3aV0AAAAASUVORK5CYII=";

const MainPage = () => {
  return (
    <Layout>
      <div>
      <EventCard color = "#ff8a65" text = "Fun Party" onClick = {login}></EventCard>
      </div>
      <div>
        <AddEventCard onClick = {login}></AddEventCard>
      </div>
    </Layout>
  );
};

export default MainPage;
