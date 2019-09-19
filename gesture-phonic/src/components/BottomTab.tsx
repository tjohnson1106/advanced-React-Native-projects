import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent } from "react-native-redash";

import TabIcon from "./TabIcon";
import Player from "./Player";
import MiniPlayer from "./MiniPlayer";

const { Value } = Animated;
const { height } = Dimensions.get("window");
const TABBAR_HEIGHT = getBottomSpace() + 50;
const MINIMIZED_PLAYER_HEIGHT = 42;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;

const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};

const styles = StyleSheet.create({
  playerSheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "cyan"
  },
  container: {
    backgroundColor: "#272829",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: TABBAR_HEIGHT,
    flexDirection: "row",
    borderTopColor: "black",
    borderWidth: 1
  }
});

export default () => {
  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  // gesture handler
  const gestureHandler = onGestureEvent({
    translationY,
    velocityY,
    state
  });
  const translateY = translationY;
  const translateBottomTab = 0;

  return (
    <View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={[styles.playerSheet, { transform: [{ translateY }] }]}>
          <Player onPress={() => true} />

          <Animated.View
            // prettier-ignore
            style={{ opacity: 0, position: "absolute", top: 0, left: 0, right: 0,   height: MINIMIZED_PLAYER_HEIGHT }}
          >
            <MiniPlayer />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={{ transform: [{ translateY: translateBottomTab }] }}>
        <SafeAreaView style={styles.container}>
          <TabIcon name="home" label="Home" />
          <TabIcon name="search" label="Search" />
          <TabIcon name="chevron-up" label="Player" onPress={() => setUp(true)} />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};
