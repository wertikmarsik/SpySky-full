import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
vi.mock("axios");

import filters from "./filters.vue";
const url = "https://famous-plexus-417323.lm.r.appspot.com/";

describe("UI", () => {

    const wrapper = shallowMount(filters);
    const filtersPanel = wrapper.find(".filters");
    const namesDropdown = wrapper.find(".satellite-names-options");
    const idsDropdown = wrapper.find(".objects-id-options");

    const filtersOpenBtn = wrapper.find("#arrow");
    const namesOpenBtn = wrapper.find("#selected-name");
    const idsOpenBtn = wrapper.find("#selected-id");

    it("should show/hide the filters panel", async () => {
        expect(filtersPanel.exists()).toBe(true);
        expect(wrapper.vm.areFiltersVisible).toBe(false);

        await filtersOpenBtn.trigger("click");
        expect(wrapper.vm.areFiltersVisible).toBe(true);

        await filtersOpenBtn.trigger("click");
        expect(wrapper.vm.areFiltersVisible).toBe(false);
    })

    it("should show/hide the names dropdown", async () => {
        expect(namesDropdown.exists()).toBe(true);
        expect(wrapper.vm.isNamesDropdownVisible).toBe(false);

        await namesOpenBtn.trigger("click");
        expect(wrapper.vm.isNamesDropdownVisible).toBe(true);

        await namesOpenBtn.trigger("click");
        expect(wrapper.vm.isNamesDropdownVisible).toBe(false);
    })

    it("should show/hide the ids dropdown", async () => {
        expect(idsDropdown.exists()).toBe(true);
        expect(wrapper.vm.isIdsDropdownVisible).toBe(false);

        await idsOpenBtn.trigger("click");
        expect(wrapper.vm.isIdsDropdownVisible).toBe(true);

        await idsOpenBtn.trigger("click");
        expect(wrapper.vm.isIdsDropdownVisible).toBe(false);
    })
})

describe("Select options", () => {
    it("should select a name and emit it", async () => {
        const wrapper = shallowMount(filters, {
            data() {
                return {
                  isNamesDropdownVisible: true,
                  objects: [{
                        "epoch": "2024-06-01T12:26:16.808+00:00",
                        "object_id": "2024-081A",
                        "object_name": "LEGION 1",
                        "x": 4146.879089749473,
                        "y": 4701.70751819953,
                        "z": 2866.209490351597
                    }]
                };
              },
        })

        const selectedName = wrapper.find("#selected-name");
        expect(selectedName.exists()).toBe(true);

        const nameOption = wrapper.find(".satellite-name");
        expect(nameOption.exists()).toBe(true);

        await nameOption.trigger("click");

        expect(wrapper.vm.selectedName).toEqual("LEGION 1");
        expect(wrapper.vm.isNamesDropdownVisible).toBe(false);

        expect(wrapper.emitted().nameWasSelected).toBeTruthy();
    })

    it("should make a selected id null and emit it", async () => {
        const wrapper = shallowMount(filters, {
            data() {
                return {
                  selectedId: "some id...",
                  isNamesDropdownVisible: true,
                  objects: [{
                        "epoch": "2024-06-01T12:26:16.808+00:00",
                        "object_id": "2024-081A",
                        "object_name": "LEGION 1",
                        "x": 4146.879089749473,
                        "y": 4701.70751819953,
                        "z": 2866.209490351597
                    }]
                };
              },
        })

        expect(wrapper.vm.selectedId).not.toEqual("Select an id");

        const nameOption = wrapper.find(".satellite-name");

        await nameOption.trigger("click");
        expect(wrapper.vm.selectedId).toEqual("Select an id");
        expect(wrapper.emitted().filtersChanged).toBeTruthy();
    })

    it("should select an id and emit it", async () => {
        const wrapper = shallowMount(filters, {
            data() {
                return {
                  isIdsDropdownVisible: true,
                  objects: [{
                        "epoch": "2024-06-01T12:26:16.808+00:00",
                        "object_id": "2024-081A",
                        "object_name": "LEGION 1",
                        "x": 4146.879089749473,
                        "y": 4701.70751819953,
                        "z": 2866.209490351597
                    }]
                };
              },
        })

        const selectedId = wrapper.find("#selected-id");
        expect(selectedId.exists()).toBe(true);

        const idOption = wrapper.find(".object-id");
        expect(idOption.exists()).toBe(true);

        await idOption.trigger("click");

        expect(wrapper.vm.selectedId).toEqual("2024-081A");
        expect(wrapper.vm.isIdsDropdownVisible).toBe(false);

        expect(wrapper.emitted().idWasSelected).toBeTruthy();
        expect(wrapper.emitted().filtersChanged).toBeTruthy();
    })

    it("should make a selected name null and emit it", async () => {
        const wrapper = shallowMount(filters, {
            data() {
                return {
                  selectedName: "some name...",
                  isIdsDropdownVisible: true,
                  objects: [{
                        "epoch": "2024-06-01T12:26:16.808+00:00",
                        "object_id": "2024-081A",
                        "object_name": "LEGION 1",
                        "x": 4146.879089749473,
                        "y": 4701.70751819953,
                        "z": 2866.209490351597
                    }]
                };
              },
        })

        expect(wrapper.vm.selectedName).not.toEqual("Select a name");

        const idOption = wrapper.find(".object-id");

        await idOption.trigger("click");
        expect(wrapper.vm.selectedName).toEqual("Select a name");
    })
})

describe("Clear filters", () => {
    it("should clear all filters and emit it", async () => {
        const wrapper = shallowMount(filters, {
            data() {
                return {
                    minValue: "2024-05-28",
                    maxValue: "2024-06-01",
                    selectedId: "Some id...",
                    selectedName: "Some name...",
                    selectedTime: {
                      fromValue: "2024-05-30",
                      toValue: "2024-05-31"
                    },
                };
              },
        })

        const clearBtn = wrapper.find("#clear-filters");
        await clearBtn.trigger("click");

        expect(wrapper.vm.selectedId).toEqual("Select an id");
        expect(wrapper.vm.selectedName).toEqual("Select a name");
  
        expect(wrapper.vm.selectedTime["fromValue"]).toEqual(wrapper.vm.minValue);
        expect(wrapper.vm.selectedTime["toValue"]).toEqual(wrapper.vm.maxValue);
    })
})

describe("Epochs", () => {
    it("should make an array with all epochs", async () => {
        const wrapper = shallowMount(filters, {
            data() {
                return {
                    minValue: "2024-05-28",
                    maxValue: "2024-05-30",
                    epochs: {}
                }
            }
        });

        await wrapper.vm.getEpochs();

        expect(wrapper.vm.epochs).toEqual(
            {"0": "2024-05-28", "1": "2024-05-29", "2": "2024-05-30"}
        )
    })
})

describe("Range slider", () => {
    it("should change slider when different values selected", async () => {
        const wrapper = shallowMount(filters, {
            data() {
                return {
                    minValue: "2024-05-28",
                    maxValue: "2024-05-30",
                    epochs: {"0": "2024-05-28", "1": "2024-05-29", "2": "2024-05-30"}
                }
            }
        });

        const value1 = wrapper.findAll(".value-input p").at(0);
        const value2 = wrapper.findAll(".value-input p").at(1);

        const rangeInput1 = wrapper.findAll(".range-input input").at(0);
        const rangeInput2 = wrapper.findAll(".range-input input").at(1);

        expect(value1.text()).toEqual("From: 2024-05-28");
        expect(value2.text()).toEqual("To: 2024-05-30");

        rangeInput1.value = 0;
        rangeInput2.value = 2;

        await wrapper.vm.$nextTick();

        // expect(wrapper.vm.selectedTime["fromValue"]).toEqual(wrapper.vm.epochs[0]);

        // expect(value1.text()).toEqual("From: 2024-05-29");
        // expect(value2.text()).toEqual("To: 2024-05-30");


    })
})