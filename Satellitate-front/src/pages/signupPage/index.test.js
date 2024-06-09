import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { ref } from "vue";
import axios from 'axios'
vi.mock('axios');

import sign from './index.vue';
const url = "https://famous-plexus-417323.lm.r.appspot.com/";

describe('Country', () => {
    it('should successfully get country data', async () => {
        const countryMockedData = [
            {id: 1, country_name: 'Ukraine'},
            {id: 2, country_name: 'United States'},
            {id: 3, country_name: 'Canada'},
            {id: 4, country_name: 'United Kingdom'},
            {id: 5, country_name: 'Germany'},
            {id: 6, country_name: 'France'},
            {id: 7, country_name: 'Italy'},
            {id: 8, country_name: 'Spain'},
            {id: 9, country_name: 'Australia'},
            {id: 10, country_name: 'Japan'}
        ]

        axios.get.mockResolvedValue({
            data: countryMockedData,
        })

        const wrapper = shallowMount(sign, {
            data() {
              return {
                countries: []
              };
            },
        });

        await wrapper.vm.getCountriesData();
        expect(axios.get).toHaveBeenCalledWith(`${url}/countries/`)
        expect(wrapper.vm.countries).not.toEqual([]);
    })

    it('should return error', async () => {
        const consoleSpy = vi.spyOn(console, 'log')

        const mockError = new Error('Network Error'); 
        axios.get.mockRejectedValue(mockError);

        const wrapper = shallowMount(sign, {
            data() {
              return {
                countries: []
              };
            },
        });

        await wrapper.vm.getCountriesData();
        expect(wrapper.vm.countries).toEqual([]);
        expect(consoleSpy).toHaveBeenLastCalledWith('Error fetching countries data: Network Error');
    })
})

describe('UI', () => {
    it('should change page to second when clicked on a button', async () => {
        const wrapper = shallowMount(sign, {
            data() {
                return {
                    currentPage: ref("page1") 
                }
            }
        });
        const nextBtn = wrapper.find("#next-button");
        
        expect(nextBtn.exists()).toBe(true);
        expect(wrapper.vm.currentPage.value).toBe("page1");
        await nextBtn.trigger("click");
        expect(wrapper.vm.currentPage.value).toBe("page2");
    })

    it('should change page from second to first when clicked on a button', async () => {
        const wrapper = shallowMount(sign, {
            data() {
              return {
                currentPage: ref("page2"),
              };
            },
          });

        const backBtn = wrapper.find("#back");

        await backBtn.trigger("click");
        expect(wrapper.vm.currentPage.value).toBe("page1");
    })

    it('should show/hide the password', async () => {
        const wrapper = shallowMount(sign, {
            data() {
              return {
                currentPage: ref("page2"),
              };
            },
        });
        
        const inputs = wrapper.findAll(".password");

        const eyeBtn = wrapper.find("#visibilityButton1");
        const eyeConfirmBtn = wrapper.find("#visibilityButton2");

        expect(inputs[0].exists()).toBe(true);
        expect(inputs[1].exists()).toBe(true);
        expect(eyeBtn.exists()).toBe(true);
        expect(eyeConfirmBtn.exists()).toBe(true);

        await inputs[0].setValue('11111');
        expect(inputs[0].element.type).toBe('password');

        await eyeBtn.trigger("click");
        expect(inputs[0].element.type).toBe('text');

        await eyeBtn.trigger("click");
        expect(inputs[0].element.type).toBe('password');


        await inputs[1].setValue('11111');
        expect(inputs[1].element.type).toBe('password');

        await eyeConfirmBtn.trigger("click");
        expect(inputs[1].element.type).toBe('text');

        await eyeConfirmBtn.trigger("click");
        expect(inputs[1].element.type).toBe('password');
    })

    it('should show/hide dropdown when clicked on a country list', async () => {
        const wrapper = shallowMount(sign, {
            data() {
              return {
                currentPage: ref("page1"),
              };
            },
        });

        expect(wrapper.vm.showOptions).toEqual(false);

        await wrapper.find(".countries").trigger("click");
        expect(wrapper.vm.showOptions).toEqual(true);

        await wrapper.find(".countries").trigger("click");
        expect(wrapper.vm.showOptions).toEqual(false);
    })

    it('should select country when clicked and hide the dropdown', async () => {
        const wrapper = shallowMount(sign, {
            data() {
              return {
                showOptions: true,
                currentPage: ref("page1"),
                countries: [
                    {id: 1, country_name: 'Ukraine'},
                    {id: 2, country_name: 'United States'}
                ]
              };
            },
        });

        const allCountries = wrapper.findAll(".country-option");
        expect(wrapper.vm.selectedCountry).toEqual("Select a country");

        await allCountries[0].trigger("click");

        expect(wrapper.vm.selectedCountry).toEqual("Ukraine");
        expect(wrapper.vm.showOptions).toEqual(false);
    })
})


describe('Sign in', () => {
    it('should register the user', async () => {
        const wrapper = shallowMount(sign, {
            data() {
                return {
                    firstName: "Name",
                    lastName: "Surname",
                    phone_number: "+380000000000",
                    email: "email@gmail.com",
                    password: "1111",
                    selectedCountry: "Ukraine"
                }
            }
        });

        const mockResponse = { data: "some cookies" };
        axios.post.mockResolvedValue(mockResponse);
        
        await wrapper.vm.registerUser();
        expect(axios.post).toHaveBeenCalledWith(`${url}/users/register`, 
        {
            first_name: wrapper.vm.firstName,
            last_name: wrapper.vm.lastName,
            country: wrapper.vm.selectedCountry,
            phone_number: wrapper.vm.phone_number,
            email: wrapper.vm.email,
            password: wrapper.vm.password
        })
    })

    it('should return an error if a problem with registration', async () => {
        const consoleSpy = vi.spyOn(console, 'error')
        
        const wrapper = shallowMount(sign, {
            data() {
                return {
                    firstName: "Name",
                    lastName: "Surname",
                    phone_number: "+380000000000",
                    email: "email@gmail.com",
                    password: "1111",
                    selectedCountry: "Ukraine"
                }
            }
        });

        const mockResponse = new Error('Bad Network');
        axios.post.mockRejectedValue(mockResponse);
        
        await wrapper.vm.registerUser();
        expect(consoleSpy).toHaveBeenLastCalledWith('Bad Network');
    })

    it('should confirm user after registration', async () => {
        const wrapper = shallowMount(sign, {
            data() {
                return {
                    confirmationCode: "185206"
                }
            }
        });

        const mockResponse = { data: "some cookies" };
        axios.post.mockResolvedValue(mockResponse);
        
        await wrapper.vm.confirmUser();
        expect(axios.post).toHaveBeenCalledWith(`${url}/users/confirm`, 
        {
            confirmationCode: wrapper.vm.confirmCode
        })

    })
})