export const validateEmail=(emailInput)=>{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailInput);
}