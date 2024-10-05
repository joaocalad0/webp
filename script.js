const commands = [
    "echo 'Welcome to Beja HackLab!'", 
    "ls -a",
    "cd /root",
    "sudo rm -rf /",
    "exit"
];

let index = 0; 
let charIndex = 0; 
let currentCommand = ''; 
let typingSpeed = 100; 

// ASCII Art do sorriso
const asciiArt = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⡶⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢺⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣻⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⠶⠾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠷⢰⣆⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⡄
⢀⠀⠙⢿⣿⣷⠀⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣼⠏⠁
⠈⠀⣧⠀⠛⢿⡿⢿⣿⣿⣶⣄⢠⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⡶⠾⠞⠛⠋⢁⠀⠀
⠀⠀⠘⠁⠆⠀⠁⡀⠹⠟⣿⣿⡾⣷⠀⢀⣿⣷⠀⣠⣿⣷⣆⠀⢰⣿⣿⣷⠀⢠⣾⣇⠀⣼⠃⠰⡿⢹⠋⠀⠀⢠⢺⠀⡎⠀⠀
⠀⠀⠀⠀⠀⠈⠆⠀⢀⡀⠉⠈⠃⠈⠠⣾⣿⣿⢠⣿⣿⣿⣿⠂⢸⣿⣿⣿⣗⣻⣿⣿⡦⢿⡼⠇⠁⠀⠃⠀⡇⠘⠈⠀⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠘⠀⠈⢷⠈⢷⠄⠀⠃⠙⠿⠏⣼⣿⣿⣿⣿⣦⣾⣿⢿⣿⣵⠟⠿⠛⠁⠈⢳⠐⠀⡠⢠⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢅⣸⡆⠀⠀⠀⢀⠀⠛⠿⠿⠛⠛⠋⠻⣿⣼⠻⠿⡀⢀⣤⣀⠀⣦⠀⠈⠃⠘⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠁⣆⠀⢀⣾⡆⢼⣷⣶⠀⣾⣵⢀⣿⣷⠀⣿⡇⢸⣿⣿⡀⢻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⣾⠟⠁⣸⣿⡟⠘⣿⡟⢸⣿⡿⠀⢿⡇⠸⣿⡟⠇⠈⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠙⠟⠁⠀⠉⠁⠈⠛⠇⠀⠀⠁⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

function typeCommand() {
    const commandElement = document.querySelector('.command');
    const asciiElement = document.getElementById('ascii-art');
    
    // Exibe a arte ASCII de forma constante
    asciiElement.textContent = asciiArt;

    // Digita o comando
    if (charIndex < commands[index].length) {
        currentCommand += commands[index].charAt(charIndex);
        commandElement.textContent = currentCommand; 
        charIndex++;
        setTimeout(typeCommand, typingSpeed); 
    } else {
        // Reseta o comando para o próximo
        charIndex = 0;
        currentCommand = ''; 
        index = (index + 1) % commands.length; 
        setTimeout(typeCommand, typingSpeed + 500); 
    }
}

window.onload = function() {
    const dateElement = document.getElementById('current-date');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = currentDate.toLocaleDateString('en-US', options);
    typeCommand(); 
};