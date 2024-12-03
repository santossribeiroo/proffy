const Database = require('./db.js');
const createProffy = require('./createProffy');

Database.then(async (db) => {
    //Inserir dados:
    proffyValue = {
        name: "The Curious Boy",
        avatar:"/image/icons/shiba-curioso.png",
        whatsapp:"11932198256",
        bio:"Curioso, brincalhão e desconfiado.<br/><br/>Apaixonado por misterios e jornadas suspeitas. Sempre em busca de um pestico novo, mas buscando entender a procedencia da coisa"
    }

    classValue = {
        subject: 1,
        cost:"20"
        //proffy_id sera criado pelo banco de dados
    }

    classScheduleValues = [
        //class_id sera criado pelo banco de dados
        {
            weekday: 1,
            time_from: 720,
            time_to: 1120
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1120
        }
    ];

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})
    
    //Consultar dados inseridos:

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys");
    // console.log(selectedProffys)

    //consultar as classes de um determinado profesor
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffy_id)
        WHERE classes.proffy_id = 1;
    `);
    // console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horario do time_from (8h) precisa ser menor ou igual ao horario solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `);
    
    console.log(selectClassesSchedules);
}); 