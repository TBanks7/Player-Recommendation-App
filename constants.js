const API_URL_MAPPING = {
    DEVELOPMENT: "http://localhost:5000",
    PRODUCTION: "https://tbanks.pythonanywhere.com"
};


export const positionMap = {
    // Defenders
    'Left-Back': 'LB',
    'Right-Back': 'RB',
    'Centre-Back': 'CB',
    
    // Midfielders
    'Left Midfield': 'LM',
    'Right Midfield': 'RM',
    'Central Midfield': 'CM',
    'Attacking Midfield': 'AM',
    'Defensive Midfield': 'DM',
    
    // Forwards
    'Left Winger': 'LW',
    'Right Winger': 'RW',
    'Centre-Forward': 'CF',
    'Second Striker': 'SS',
    
    // Goalkeeper
    'Goalkeeper': 'GK'
  };



export const API_URL = API_URL_MAPPING.PRODUCTION; // Change to DEVELOPMENT for local testing