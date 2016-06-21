import { Plant } from "./interfaces";
import { Plant as newPlant } from "./plant";
import { generateReducer } from "../generate_reducer";
import { DesignerState } from "./interfaces";
import { cloneDeep } from "lodash";
import { HardwareState } from "../devices/interfaces";
import { ICONS } from "./icons";

export let designer = generateReducer<DesignerState>({ plants: [], x_size: 0, y_size: 0 })
  .add<Plant[]>("FETCH_PLANTS_OK", function(s, a) {
    let state = cloneDeep(s);
    let plants = a.payload.map(function(p) {
      p.icon = _.sample(ICONS);
      return p;
    });
    state.plants = plants;
    return state;
  })
  .add<Plant>("SAVE_PLANT_OK", function(s, a) {
    let state = cloneDeep(s);
    // Exxxttrraaa runtime safety.
    let plant = newPlant(a.payload);
    state.plants.push(plant);
    return state;
  })
  .add<Plant>("DESTROY_PLANT_OK", function(s, { payload }) {
    let state = cloneDeep(s);
    let a = state.plants;
    a.splice(a.indexOf(payload), 1);
    return state;
  })
  .add<HardwareState>("BOT_CHANGE", function(s, { payload }) {
    let state = cloneDeep(s);
    state.x_size = payload.movement_axis_nr_steps_x;
    state.y_size = payload.movement_axis_nr_steps_y;
    return state;
  });