
import { MeaslesDataItem, QuizQuestion } from './types';

export const MEASLES_DATA: Record<string, MeaslesDataItem> = {
  "Epidemiología": {
    id: "epidemiologia",
    title: "Epidemiología y Carga Global",
    content: "El sarampión es causado por un virus ARN monocatenario de sentido negativo, género Morbillivirus, familia Paramyxoviridae. Su infectividad es extrema (R0: 12-18), transmitiéndose por gotas de Flügge que pueden permanecer suspendidas en el aire hasta 2 horas. Ataca principalmente el receptor SLAM (CD150) en células inmunes y Nectin-4 en el epitelio respiratorio. Antes de la vacuna (1963), causaba ciclos epidémicos cada 2-3 años. Actualmente, los brotes se deben a 'bolsas' de población no inmunizada. Se requiere una cobertura vacunal del ≥95% con dos dosis para alcanzar la inmunidad de rebaño y prevenir la circulación endémica.",
    type: "factor"
  },
  "Incubación": {
    id: "incubation",
    title: "Patogenia e Incubación (10-14 días)",
    content: "Tras la inoculación en el epitelio respiratorio o conjuntival, ocurre la replicación local seguida de una viremia primaria (días 2-3) donde el virus se disemina al sistema reticuloendotelial (ganglios, bazo, hígado). Posteriormente, ocurre una viremia secundaria (días 5-7) más intensa, donde el virus infecta múltiples órganos, incluyendo piel, pulmones y tracto gastrointestinal. Durante esta fase, el paciente es asintomático pero ya presenta una marcada linfopenia. El periodo de contagio inicia 4 días antes de la aparición del exantema y persiste hasta 4 días después.",
    type: "clinical"
  },
  "Pródromo": {
    id: "3cs",
    title: "Fase Prodrómica y Enantema",
    content: "Dura de 2 a 4 días. Se manifiesta con fiebre progresiva (hasta 40°C) y la tríada clásica: Tos seca (persistente por irritación traqueobronquial), Coriza (rinorrea intensa) y Conjuntivitis (con fotofobia y lagrimeo). El signo patognomónico son las Manchas de Koplik: enantema caracterizado por puntos blancos grisáceos ('granos de sal') sobre una base eritematosa en la mucosa yugal, generalmente a la altura del segundo molar inferior. Estas aparecen 48h antes del exantema y desaparecen al inicio del mismo. Otros signos incluyen las manchas de Herman (puntos azulados en el paladar blando).",
    type: "clinical"
  },
  "Exantema": {
    id: "exantema",
    title: "Fase Eruptiva (Exantema)",
    content: "Aparición de un exantema maculopapular morbiliforme, no pruriginoso, que inicia detrás de las orejas y en la línea de implantación del cabello. Tiene una progresión cefalocaudal descendente: cara y cuello (día 1), tronco y extremidades superiores (día 2), y extremidades inferiores (día 3). Las lesiones tienden a la confluencia en la parte superior del cuerpo. El pico de gravedad se alcanza al tercer día de la erupción, coincidiendo con la máxima respuesta de citoquinas proinflamatorias. La desaparición sigue el mismo orden (cefalocaudal), dejando una descamación furfurácea y una pigmentación pardusca debida a la extravasación de eritrocitos.",
    type: "clinical"
  },
  "Recuperación": {
    id: "recovery",
    title: "Resolución y Amnesia Inmune",
    content: "La fiebre suele ceder a las 48-72h de la aparición del exantema. Sin embargo, el sarampión induce un estado de inmunosupresión profunda que dura de semanas a meses. Fisiopatológicamente, el virus infecta y destruye los linfocitos B y T de memoria, lo que se denomina 'amnesia inmunológica'. Esto borra la protección previa contra otros patógenos, aumentando la vulnerabilidad a infecciones oportunistas. La recuperación completa de la diversidad del repertorio inmunológico puede tardar hasta 2-3 años, periodo en el cual la mortalidad infantil por otras causas aumenta significativamente en poblaciones afectadas.",
    type: "factor"
  },
  "Complicaciones": {
    id: "complicaciones",
    title: "Complicaciones Sistémicas",
    content: "1. Respiratorias: Neumonía (60% de las muertes), ya sea viral primaria (células gigantes de Hecht) o bacteriana secundaria (S. pneumoniae, S. aureus). Otitis media (la complicación más frecuente en niños). 2. Neurológicas: Encefalitis postinfecciosa aguda (1:1,000 casos, desmielinizante). Panencefalitis Esclerosante Subaguda (PEES): complicación fatal tardía (7-10 años post-infección) por persistencia de una variante viral mutada en el SNC. 3. Gastrointestinales: Diarrea severa (causa común de deshidratación), estomatitis y apendicitis por hiperplasia de las placas de Peyer. 4. Oftalmológicas: Queratitis que puede progresar a ceguera, especialmente en presencia de déficit de Vitamina A.",
    type: "clinical"
  },
  "Diagnóstico": {
    id: "diagnostico",
    title: "Laboratorio y Diferencial",
    content: "1. Serología (ELISA): Detección de IgM específica; es el estándar de oro. Sensibilidad máxima entre el día 3 y 28 post-exantema. 2. Biología Molecular (RT-PCR): Detección de ARN viral en exudado faríngeo u orina (idealmente en los primeros 3 días). Esencial para genotipificación y rastreo de brotes. 3. Diagnóstico Diferencial: Debe distinguirse de la Rubéola (fiebre más leve, adenopatías retroauriculares), Exantema Súbito (fiebre desaparece al salir el exantema), Escarlatina (lengua en fresa, signo de Pastia), Dengue y Kawasaki. Un error común es no considerar el sarampión en pacientes con vacunación incompleta que presentan cuadros atípicos.",
    type: "diag"
  },
  "Tratamiento": {
    id: "tratamiento",
    title: "Protocolo Terapéutico (Manejo de Vit A)",
    content: "No existe tratamiento antiviral específico. El pilar es el soporte y la Vitamina A, que reduce la mortalidad en un 50%. Protocolo OMS: Administrar dos dosis orales en días consecutivos. Dosis según edad: <6 meses (50,000 UI), 6-11 meses (100,000 UI), ≥12 meses (200,000 UI). En niños con signos clínicos de deficiencia de Vit A (manchas de Bitot, xeroftalmia), se debe administrar una tercera dosis a las 2-4 semanas. El soporte incluye hidratación agresiva, antipiréticos y tratamiento antibiótico inmediato si se sospecha sobreinfección bacteriana. La ribavirina se ha usado en casos graves/inmunosuprimidos de forma compasiva (evidencia limitada).",
    type: "diag"
  },
  "Prevención": {
    id: "prevencion",
    title: "Inmunización y Salud Pública",
    content: "La vacuna triple viral (SRP: Sarampión, Rubéola, Parotiditis) es una vacuna de virus vivos atenuados. El esquema recomendado por la OMS es: 1ra dosis a los 9-12 meses y 2da dosis a los 15-18 meses o ingreso escolar. La eficacia es del 93% con una dosis y del 97% con dos. Contraindicaciones: Embarazo, inmunosupresión severa (excepto VIH estable) y anafilaxia previa a componentes. Medidas de Control: Notificación inmediata de caso sospechoso, aislamiento respiratorio estricto y búsqueda activa de contactos para vacunación de bloqueo en las primeras 72h post-exposición.",
    type: "factor"
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { q: "¿Cuál es el receptor principal del virus del sarampión en las células del sistema inmunológico?", a: ["ACE2", "CD4", "SLAM (CD150)", "Nectin-1"], c: 2, e: "El receptor SLAM es fundamental para la infección de linfocitos y la diseminación sistémica." },
  { q: "En el periodo prodrómico, ¿cuáles son las denominadas '3 C'?", a: ["Calor, Cansancio, Caída", "Tos (Cough), Coriza, Conjuntivitis", "Ceguera, Coma, Crisis", "Cama, Comida, Calor"], c: 1, e: "La tríada clásica de síntomas respiratorios y oculares precede al exantema." },
  { q: "¿Qué dosis de Vitamina A corresponde a un lactante de 10 meses según la OMS?", a: ["50,000 UI", "100,000 UI", "200,000 UI", "No está indicada"], c: 1, e: "Niños de 6 a 11 meses deben recibir 100,000 UI en dos dosis consecutivas." },
  { q: "¿Qué células gigantes multinucleadas con inclusiones intranucleares son patognomónicas en el tejido linfoide?", a: ["Células de Reed-Sternberg", "Células de Warthin-Finkeldey", "Células de Langhans", "Células de Kupffer"], c: 1, e: "Las células de Warthin-Finkeldey son características de la histopatología del sarampión." },
  { q: "¿Cuál es el número de reproducción básico (R0) estimado para el sarampión?", a: ["1-2", "5-7", "12-18", "50-100"], c: 2, e: "Es uno de los patógenos más contagiosos conocidos por la humanidad." },
  { q: "¿Qué receptor utiliza el virus para el egreso y diseminación a través del epitelio respiratorio?", a: ["SLAM", "CD46", "Nectin-4", "Integrina αvβ3"], c: 2, e: "Nectin-4 es el receptor epitelial localizado en las uniones adherentes." },
  { q: "¿En qué ventana temporal es más sensible la PCR de exudado faríngeo tras el inicio del exantema?", a: ["Día 1-3", "Día 10", "Día 21", "Día 30"], c: 0, e: "La carga viral disminuye rápidamente tras la aparición de la respuesta inmune adaptativa." },
  { q: "¿Cuál es la causa más común de muerte relacionada con el sarampión en niños?", a: ["Diarrea", "Encefalitis", "Neumonía", "Ceguera"], c: 2, e: "La neumonía, viral o bacteriana, causa el 60% de la mortalidad." },
  { q: "¿Qué caracteriza a la 'amnesia inmunológica' inducida por el virus?", a: ["Pérdida de memoria a corto plazo", "Destrucción de linfocitos B y T de memoria previos", "Incapacidad de producir anticuerpos IgM", "Miedo irracional a las vacunas"], c: 1, e: "El virus borra la memoria inmunológica contra otros patógenos adquirida previamente." },
  { q: "¿Cómo se denominan las manchas azuladas en el paladar blando que pueden preceder al exantema?", a: ["Manchas de Koplik", "Manchas de Bitot", "Manchas de Herman", "Manchas de Forchheimer"], c: 2, e: "Las manchas de Herman son un signo del enantema menos conocido que las de Koplik." },
  { q: "¿Cuál es la complicación neurológica fatal que ocurre años después de la infección inicial?", a: ["Meningitis viral", "Panencefalitis Esclerosante Subaguda (PEES)", "Encefalitis diseminada aguda", "Parálisis de Bell"], c: 1, e: "La PEES es causada por una variante mutante persistente del virus en el cerebro." },
  { q: "¿Qué porcentaje de cobertura vacunal se requiere para mantener la inmunidad de rebaño?", a: ["70%", "80%", "90%", "≥95%"], c: 3, e: "Dada su alta infectividad, se requiere una cobertura casi universal." },
  { q: "¿Qué proteína viral suele presentar defectos de ensamblaje en los casos de PEES?", a: ["Hemaglutinina (H)", "Proteína de Fusión (F)", "Proteína de Matriz (M)", "Fosfoproteína (P)"], c: 2, e: "Las mutaciones en la proteína M impiden la formación de partículas virales completas, favoreciendo la persistencia celular." },
  { q: "¿Cuál es la progresión típica del exantema morbiliforme?", a: ["Centrípeta (extremidades a tronco)", "Cefalocaudal (cabeza a pies)", "Solo en palmas y plantas", "Aleatoria"], c: 1, e: "Inicia en la línea de implantación del cabello y desciende gradualmente." },
  { q: "¿Qué dosis de Vitamina A se administra a un lactante menor de 6 meses?", a: ["25,000 UI", "50,000 UI", "100,000 UI", "No se administra"], c: 1, e: "El protocolo dicta 50,000 UI para menores de 6 meses." },
  { q: "¿Cuál es el periodo de incubación promedio del sarampión hasta la aparición de fiebre?", a: ["1-3 días", "10-14 días", "21-28 días", "6 meses"], c: 1, e: "El periodo suele ser de unos 10 días hasta la fiebre y 14 hasta el exantema." },
  { q: "¿Cuál es la ventana máxima para la profilaxis post-exposición con la vacuna?", a: ["24 horas", "72 horas", "7 días", "No existe"], c: 1, e: "La vacuna administrada dentro de las 72h puede prevenir o modificar el cuadro." },
  { q: "En el diagnóstico diferencial, ¿qué signo clínico es más característico de la Rubéola?", a: ["Manchas de Koplik", "Fiebre de 40°C", "Adenopatías retroauriculares/cervicales", "Neumonía gigante"], c: 2, e: "Las adenopatías dolorosas son un sello distintivo de la rubéola." },
  { q: "¿Qué tipo de inmunidad se ve principalmente afectada durante la fase aguda?", a: ["Inmunidad celular (Linfocitos T)", "Inmunidad innata", "Inmunidad pasiva", "Inmunidad de barrera"], c: 0, e: "La linfopenia T severa contribuye a la susceptibilidad a infecciones secundarias." },
  { q: "¿A qué familia de virus pertenece el Morbillivirus?", a: ["Orthomyxoviridae", "Paramyxoviridae", "Retroviridae", "Herpesviridae"], c: 1, e: "Pertenece a la familia Paramyxoviridae, junto con el virus de la parotiditis." }
];
