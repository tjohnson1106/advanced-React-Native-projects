import React from "react";
import { StatusBar } from "react-native";

import Album from "./src/components/Album";
import BottomTab from "./src/components/BottomTab";
import LoadAssets from "./src/components/LoadAssets";

const assets = [
  require("./src/assets/Jan-Blomqvist.jpg"),
  require("./src/assets/thebay.jpg")
];

export default function App() {
  return (
    <LoadAssets {...{ assets }}>
      <StatusBar barStyle="light-content" />
      <Album />
      <BottomTab />
    </LoadAssets>
  );
}
