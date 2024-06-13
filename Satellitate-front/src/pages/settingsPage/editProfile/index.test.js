import { it, expect, describe, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import profile from "./index.vue";
import axios from "axios"

const url = "https://famous-plexus-417323.lm.r.appspot.com/";

vi.mock("axios");

describe("User", () => {
    it("should deactivate the user", async () => {
        const wrapper = shallowMount(profile, {
            data() {
                return {
                    email: "email@gmail.com"
                }
            }
        });
    
        await wrapper.vm.deactivateUser();
        expect(axios.post).toHaveBeenCalledWith(`${url}/users/deactivate`, 
        {
            email: wrapper.vm.email
        })
    })
    
    it("should delete the user", async () => {
        const wrapper = shallowMount(profile, {
            data() {
                return {
                    email: "email@gmail.com"
                }
            }
        });
    
        await wrapper.vm.deleteUser();
        expect(axios.delete).toHaveBeenCalledWith(`${url}/users/${wrapper.vm.email}`)
    })
    
    it("should update password", async () => {
        const wrapper = shallowMount(profile, {
            data() {
                return {
                    email: "address@gmail.com",
                    oldPassword: "1111",
                    newPassword: "2222",
                }
            }
        });
    
        await wrapper.vm.updatePassword();
        expect(axios.put).toHaveBeenCalledTimes(1);
    
        expect(axios.put).toHaveBeenCalledWith(`${url}/users/password`, {
            email: wrapper.vm.email,
            oldPassword: wrapper.vm.oldPassword,
        })
    })

    it("should update personal info", async () => {
        const wrapper = shallowMount(profile, {
            data() {
                return {
                    first_name: "Name",
                    last_name: "Surname",
                    email: "email@gmail.com",
                    selectedCountry: 1,
                    countries: [{id: 1, country_name: "Ukraine"}, {id: 2, country_name: "United States"}]
                }
            }
        });
    
        await wrapper.vm.updatePersonalInfo();
        expect(axios.put).toHaveBeenCalledWith(`${url}/users/profile`, {
            first_name: "Name",
            last_name: "Surname",
            email: "email@gmail.com",
            country: "Ukraine",
        })
    
    })
})

describe("Country", () => {
    it("should find a country", async () => {
        const wrapper = shallowMount(profile, {
            data() {
                return {
                    selectedCountry: 1,
                    countries: [{id: 1, country_name: "Ukraine"}, {id: 2, country_name: "United States"}]
                }
            }
        });
    
        const res = await wrapper.vm.findCountry();
        expect(res).toEqual("Ukraine")
    })
})

describe("UI", () => {
    it("should change the visibility of a password", async () => {
        const wrapper = shallowMount(profile, {
            data() {
                return {
                    email: "Some email..."
                }
            }
        });
    
        const inputs = wrapper.findAll(".password");
        const eyeBtn = wrapper.findAll(".password-input img");
    
        expect(inputs[0].exists()).toBe(true);
        expect(inputs[1].exists()).toBe(true);
        expect(eyeBtn[0].exists()).toBe(true);
        expect(eyeBtn[1].exists()).toBe(true);
    
        await inputs[0].setValue("11111");
        expect(inputs[0].element.type).toBe("password");
    
        await eyeBtn[0].trigger("click");
        expect(inputs[0].element.type).toBe("text");
    
        await eyeBtn[0].trigger("click");
        expect(inputs[0].element.type).toBe("password");
    
    
        await inputs[1].setValue("11111");
        expect(inputs[1].element.type).toBe("password");
    
        await eyeBtn[1].trigger("click");
        expect(inputs[1].element.type).toBe("text");
    
        await eyeBtn[1].trigger("click");
        expect(inputs[1].element.type).toBe("password");
    })
})