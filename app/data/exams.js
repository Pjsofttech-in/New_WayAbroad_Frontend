const exams = {
  // ==========================================
  // ACT
  // ==========================================
  act: {
    name: "ACT",
    fullName: "ACT (American College Testing)",

    description:
      "Master the ACT with our comprehensive preparation program designed to maximize your college admission potential",

    whatIsIt:
      "The ACT is a standardized test used for college admissions in the United States. It evaluates English, mathematics, reading, and science reasoning skills. An optional writing test measures your writing abilities.",

    sections: [
      {
        name: "English",
        questions: "75 questions",
        time: "45 minutes",
        icon: "▣",
      },
      {
        name: "Math",
        questions: "60 questions",
        time: "60 minutes",
        icon: "±",
      },
      {
        name: "Reading",
        questions: "40 questions",
        time: "35 minutes",
        icon: "▤",
      },
      {
        name: "Science",
        questions: "40 questions",
        time: "35 minutes",
        icon: "⚗",
      },
      {
        name: "Writing (Optional)",
        questions: "1 essay",
        time: "40 minutes",
        icon: "✎",
      },
    ],

    reasons: [
      {
        title: "Expert instructors with years of experience",
        description:
          "Learn from seasoned professionals who understand the ACT inside and out.",
        icon: "♟",
      },
      {
        title: "Personalized study plans",
        description:
          "Customized learning paths tailored to your strengths and areas for improvement.",
        icon: "▣",
      },
      {
        title: "Comprehensive study materials",
        description:
          "Access to extensive resources including practice questions and guides.",
        icon: "◆",
      },
      {
        title: "Practice tests with detailed feedback",
        description:
          "Regular assessments with in-depth analysis to track your progress.",
        icon: "▣",
      },
      {
        title: "Flexible learning options",
        description:
          "Choose between in-person and online classes.",
        icon: "◉",
      },
    ],

    journeyTitle: "Ready to Start Your ACT Journey?",
    journeyText:
      "Join thousands of students who achieved their target scores.",
  },

  // ==========================================
  // SAT
  // ==========================================
  sat: {
    name: "SAT",
    fullName: "SAT (Scholastic Assessment Test)",

    description:
      "Achieve your target SAT score with our comprehensive preparation program",

    whatIsIt:
      "The SAT is a standardized test widely used for college admissions in the United States. It measures mathematical, critical reading, and writing skills that are needed for academic success in college. The test is intended to assess a student's readiness for college and provide colleges with one common data point that can be used to compare all applicants.",

    sections: [
      {
        name: "Reading Test",
        questions: "52 questions",
        time: "65 minutes",
        icon: "▤",
      },
      {
        name: "Writing and Language Test",
        questions: "44 questions",
        time: "35 minutes",
        icon: "✎",
      },
      {
        name: "Math Test",
        questions: "58 questions",
        time: "80 minutes",
        icon: "±",
      },
      {
        name: "Essay (Optional)",
        questions: "1 essay",
        time: "50 minutes",
        icon: "✎",
      },
    ],

    reasons: [
      {
        title: "Comprehensive test-taking strategies",
        description:
          "Master proven techniques and approaches that help you tackle each section with confidence and efficiency.",
        icon: "♟",
      },
      {
        title:
          "Personalized study plans tailored to your strengths and weaknesses",
        description:
          "Get customized learning paths based on detailed assessment of your current abilities and target goals.",
        icon: "▣",
      },
      {
        title: "Access to official SAT practice tests",
        description:
          "Practice with authentic SAT materials and get familiar with the exact format and question types you'll encounter.",
        icon: "◆",
      },
      {
        title: "Expert instructors with proven track records",
        description:
          "Learn from experienced educators who have helped thousands of students achieve their target SAT scores.",
        icon: "♟",
      },
      {
        title: "Flexible learning options to fit your schedule",
        description:
          "Choose from various class timings, online sessions, and self-paced study options that work with your lifestyle.",
        icon: "◉",
      },
    ],

    journeyTitle: "Ready to Start Your SAT Journey?",
    journeyText:
      "Join thousands of successful students who achieved their target scores with Wayabroad",
  },

  // ==========================================
  // GRE
  // ==========================================
  gre: {
  name: "GRE",
  fullName: "GRE (Graduate Record Examination)",

  description:
    "Master graduate school admissions with our comprehensive GRE preparation program",

  whatIsIt:
    "The GRE is a standardized test that is an admissions requirement for many graduate schools in the United States and Canada. It measures verbal reasoning, quantitative reasoning, analytical writing, and critical thinking skills that have been acquired over a long period of time and that are not related to any specific field of study. The test is designed to predict success in graduate school programs.",

  sections: [
    {
      name: "Analytical Writing",
      questions: "2 essays",
      time: "60 minutes",
      icon: "✎",
    },
    {
      name: "Verbal Reasoning",
      questions: "2 sections",
      time: "60 minutes total",
      icon: "▤",
    },
    {
      name: "Quantitative Reasoning",
      questions: "2 sections",
      time: "70 minutes total",
      icon: "±",
    },
    {
      name: "Unscored/Research Section",
      questions: "Varies",
      time: "Varies",
      icon: "◆",
    },
  ],

  scoring: [
    {
      name: "Verbal Reasoning",
      score: "130-170",
      description:
        "Measures ability to analyze and evaluate written material and synthesize information",
    },
    {
      name: "Quantitative Reasoning",
      score: "130-170",
      description:
        "Tests mathematical skills and understanding of mathematical concepts",
    },
    {
      name: "Analytical Writing",
      score: "0-6",
      description:
        "Scored in half-point increments, measures critical thinking and analytical writing skills",
    },
  ],

  keyFeatures: [
    {
      title: "Graduate School Admission",
      description:
        "Essential requirement for most graduate programs in the United States and Canada",
      icon: "🎓",
    },
    {
      title: "Critical Thinking Focus",
      description:
        "Measures verbal reasoning, quantitative reasoning, analytical writing, and critical thinking skills",
      icon: "🧠",
    },
    {
      title: "Adaptive Testing",
      description:
        "Computer-adaptive test that adjusts difficulty based on your performance",
      icon: "✨",
    },
  ],

  reasons: [
    {
      title: "Comprehensive study materials and practice tests",
      description:
        "Access extensive study resources including full-length practice tests, question banks, and detailed explanations for all GRE sections.",
      icon: "▤",
    },
    {
      title: "Expert instructors with high GRE scores",
      description:
        "Learn from top-scoring instructors who have achieved exceptional GRE results and understand the strategies needed for success.",
      icon: "♟",
    },
    {
      title: "Personalized study plans based on diagnostic tests",
      description:
        "Receive customized study plans tailored to your strengths and weaknesses identified through comprehensive diagnostic assessments.",
      icon: "◎",
    },
    {
      title: "Vocabulary building and math refresher sessions",
      description:
        "Strengthen your foundation with dedicated vocabulary enhancement programs and comprehensive math concept review sessions.",
      icon: "♟",
    },
    {
      title: "Flexible class schedules including weekend batches",
      description:
        "Choose from various scheduling options designed to accommodate your busy lifestyle, with weekday, evening, and weekend classes available.",
      icon: "◷",
    },
  ],

  journeyTitle: "Ready to Excel in Your GRE?",

  journeyText:
    "Join thousands of successful students who achieved their target GRE scores with Wayabroad",
},

  // ==========================================
  // GMAT
  // ==========================================
  gmat: {
    name: "GMAT",
    fullName: "GMAT (Graduate Management Admission Test)",

    description:
      "Excel in your MBA journey with our comprehensive GMAT preparation program",

    whatIsIt:
      "The GMAT is a computer-adaptive test intended to assess certain analytical, writing, quantitative, verbal, and reading skills in written English for use in admission to graduate management programs, such as an MBA. The test is designed to measure the skills that business schools consider most important for success in their programs.",

    sections: [
      {
        name: "Analytical Writing Assessment",
        questions: "1 essay",
        time: "30 minutes",
        icon: "✎",
      },
      {
        name: "Integrated Reasoning",
        questions: "12 questions",
        time: "30 minutes",
        icon: "◆",
      },
      {
        name: "Quantitative",
        questions: "31 questions",
        time: "62 minutes",
        icon: "±",
      },
      {
        name: "Verbal",
        questions: "36 questions",
        time: "65 minutes",
        icon: "▤",
      },
    ],

    scoring: [
      {
        name: "Total Score",
        score: "200-800",
        description:
          "Based on Verbal and Quantitative sections",
      },
      {
        name: "Verbal",
        score: "0-60",
        description:
          "Measures reading comprehension and reasoning",
      },
      {
        name: "Quantitative",
        score: "0-60",
        description:
          "Tests mathematical and analytical skills",
      },
      {
        name: "Analytical Writing",
        score: "0-6",
        description:
          "Scored in 0.5-point increments",
      },
      {
        name: "Integrated Reasoning",
        score: "1-8",
        description:
          "Scored in 1-point increments",
      },
    ],

    reasons: [
      {
        title: "Comprehensive coverage of all GMAT sections",
        description:
          "Master every aspect of the GMAT with our complete preparation program covering AWA, IR, Quantitative, and Verbal sections.",
        icon: "◆",
      },
      {
        title: "Expert instructors with 99th percentile scores",
        description:
          "Learn from top-scoring instructors who have achieved exceptional GMAT results and know exactly what it takes to succeed.",
        icon: "♟",
      },
      {
        title: "Adaptive learning technology",
        description:
          "Experience personalized learning that adjusts to your pace and focuses on areas where you need the most improvement.",
        icon: "▣",
      },
      {
        title: "Full-length practice tests with detailed analytics",
        description:
          "Take authentic practice tests and receive comprehensive performance analysis to track your progress and identify improvement areas.",
        icon: "▣",
      },
      {
        title:
          "Flexible study options including weekend and evening classes",
        description:
          "Choose from various scheduling options designed to fit your busy lifestyle, with both online and in-person classes available.",
        icon: "◉",
      },
    ],

    journeyTitle: "Ready to Ace Your GMAT?",
    journeyText:
      "Join thousands of successful students who achieved their target scores with Wayabroad",
  },

  // ==========================================
  // IELTS
  // ==========================================
  ielts: {
    name: "IELTS",
    fullName:
      "IELTS (International English Language Testing System)",

    description:
      "Master English proficiency with our comprehensive IELTS preparation program",

    whatIsIt:
      "IELTS is the world's most popular English language proficiency test for higher education and global migration. It assesses all English skills: reading, writing, listening, and speaking. The test is designed to evaluate your ability to communicate effectively in English across all four language skills.",

    sections: [
      {
        name: "Listening",
        questions: "40 questions",
        time: "30 minutes",
        icon: "◉",
      },
      {
        name: "Reading",
        questions: "40 questions",
        time: "60 minutes",
        icon: "▤",
      },
      {
        name: "Writing",
        questions: "2 tasks",
        time: "60 minutes",
        icon: "✎",
      },
      {
        name: "Speaking",
        questions: "Face-to-face interview",
        time: "11-14 minutes",
        icon: "♟",
      },
    ],

    scoringIntro:
      "IELTS provides a score from 1 (non-user) to 9 (expert user) for each of the four skills. The overall band score is the average of the four individual scores, rounded to the nearest half-band.",

    scoring: [
      {
        name: "Overall Band Score",
        score: "1-9",
        description:
          "Average of four individual scores, rounded to nearest half-band",
      },
      {
        name: "Listening",
        score: "1-9",
        description:
          "Based on correct answers out of 40 questions",
      },
      {
        name: "Reading",
        score: "1-9",
        description:
          "Based on correct answers out of 40 questions",
      },
      {
        name: "Writing",
        score: "1-9",
        description:
          "Assessed on task achievement, coherence, lexical resource, and grammar",
      },
      {
        name: "Speaking",
        score: "1-9",
        description:
          "Evaluated on fluency, lexical resource, pronunciation, and grammar",
      },
    ],

    testTypes: [
      {
        name: "IELTS Academic",
        description:
          "For higher education or professional registration in English-speaking environments",
        icon: "🎓",
      },
      {
        name: "IELTS General Training",
        description:
          "For migration to English-speaking countries or work experience programs",
        icon: "✈",
      },
      {
        name: "IELTS for UKVI",
        description:
          "For UK visa and immigration applications, accepted by UK Visas and Immigration",
        icon: "▦",
      },
    ],

    reasons: [
      {
        title: "Expert trainers certified by IDP/British Council",
        description:
          "Learn from qualified instructors who are officially certified and have extensive experience in IELTS preparation.",
        icon: "♟",
      },
      {
        title: "Personalized feedback on writing and speaking",
        description:
          "Receive detailed, individual feedback on your writing tasks and speaking performance to improve specific areas.",
        icon: "▣",
      },
      {
        title: "Comprehensive study materials",
        description:
          "Access to extensive study resources including practice tests, sample answers, and detailed explanations for all sections.",
        icon: "◆",
      },
      {
        title: "Regular mock tests with detailed analysis",
        description:
          "Take full-length practice tests under exam conditions with comprehensive performance analysis and improvement strategies.",
        icon: "▣",
      },
      {
        title: "Flexible batch timings",
        description:
          "Choose from various scheduling options including morning, evening, and weekend batches to fit your schedule.",
        icon: "◉",
      },
    ],

    journeyTitle: "Ready to Achieve Your Target IELTS Score?",
    journeyText:
      "Join thousands of successful students who achieved their desired IELTS bands with Wayabroad",
  },


  // ==========================================
  // TOEFL
  // ==========================================
  toefl: {
    name: "TOEFL",
    fullName: "TOEFL (Test of English as a Foreign Language)",

    breadcrumb: "wayabroad India / TOEFL Preparation",

    description:
      "Excel in academic English with our comprehensive TOEFL preparation program",

    whatIsIt:
      "The TOEFL test measures your ability to use and understand English at the university level. It evaluates how well you combine your reading, listening, speaking, and writing skills to perform academic tasks. TOEFL is accepted by more than 11,500 universities and institutions in over 160 countries, making it one of the most widely accepted English proficiency tests for academic purposes.",

    sections: [
      {
        name: "Reading",
        questions: "30-40 questions",
        time: "54-72 minutes",
        icon: "📖",
      },
      {
        name: "Listening",
        questions: "28-39 questions",
        time: "41-57 minutes",
        icon: "🎧",
      },
      {
        name: "Speaking",
        questions: "4 tasks",
        time: "17 minutes",
        icon: "🎤",
      },
      {
        name: "Writing",
        questions: "2 tasks",
        time: "50 minutes",
        icon: "✍",
      },
    ],

    scoringIntro:
      "TOEFL scores range from 0 to 120 points. Each of the four sections (Reading, Listening, Speaking, Writing) is scored from 0 to 30 points. The total score is the sum of all four section scores, providing a comprehensive measure of your English proficiency.",

    scoring: [
      {
        name: "Total Score",
        score: "0-120",
        description:
          "Sum of all four sections, reported as total score",
      },
      {
        name: "Reading",
        score: "0-30",
        description:
          "Measures ability to understand academic reading passages",
      },
      {
        name: "Listening",
        score: "0-30",
        description:
          "Evaluates understanding of English in academic settings",
      },
      {
        name: "Speaking",
        score: "0-30",
        description:
          "Assesses ability to speak English effectively in academic contexts",
      },
      {
        name: "Writing",
        score: "0-30",
        description:
          "Tests ability to write in English for academic purposes",
      },
    ],

    keyFeatures: [
      {
        title: "Academic Focus",
        description:
          "Specifically designed to measure English skills needed for academic success in university environments",
        icon: "🎓",
      },
      {
        title: "Integrated Skills",
        description:
          "Tests your ability to combine reading, listening, speaking, and writing skills in academic contexts",
        icon: "🧠",
      },
      {
        title: "Widely Accepted",
        description:
          "Accepted by 11,500+ universities and institutions in 160+ countries worldwide",
        icon: "🌎",
      },
    ],

    reasons: [
      {
        title: "Experienced native English instructors",
        description:
          "Learn from qualified native English speakers with extensive experience in TOEFL preparation and academic English instruction.",
        icon: "♟",
      },
      {
        title: "Personalized feedback on speaking and writing sections",
        description:
          "Receive detailed, individual feedback on your speaking performance and writing tasks to improve specific areas and boost your scores.",
        icon: "▣",
      },
      {
        title: "Comprehensive practice materials and mock tests",
        description:
          "Access extensive study resources including full-length practice tests, sample questions, and detailed explanations for all sections.",
        icon: "◆",
      },
      {
        title: "Strategies for each section of the test",
        description:
          "Master specific techniques and strategies tailored for each TOEFL section to maximize your performance and confidence.",
        icon: "▣",
      },
      {
        title: "Flexible scheduling options",
        description:
          "Choose from various class timings including weekdays, evenings, and weekends to fit your busy schedule and learning preferences.",
        icon: "◉",
      },
    ],

    journeyTitle: "Ready to Ace Your TOEFL Test?",
    journeyText:
      "Join thousands of successful students who achieved their target TOEFL scores with Wayabroad",
    journeyButton:
      "Contact us today to start your academic English journey!",
  },

  // ==========================================
  // LSAT
  // ==========================================
  // ==========================================
// LSAT
// ==========================================
lsat: {
  name: "LSAT",

  fullName: "LSAT (Law School Admission Test)",

  breadcrumb: "wayabroad India / LSAT Preparation",

  description:
    "Master the LSAT with our comprehensive preparation program designed for law school success",

  whatIsTitle: "About the LSAT",

  whatIsIt:
    "The Law School Admission Test (LSAT) is a standardized test required for admission to law schools in the United States, Canada, and a growing number of other countries. Designed to assess key skills needed for success in law school, including reading comprehension, analytical reasoning, and logical reasoning, the LSAT is a crucial component of law school applications.",


  /* =====================================================
     KEY REQUIREMENT
  ===================================================== */

  highlights: [
    {
      icon: "⚖",
      label: "Key Requirement:",
      value:
        "Required for law school admission in the US, Canada, and other countries",
    },
  ],


  /* =====================================================
     TEST STRUCTURE
  ===================================================== */

  sections: [
    {
      name: "Logical Reasoning",
      questions: "2 sections",
      time: "35 minutes each",
      icon: "◆",
      description:
        "Analyze, evaluate, and complete arguments with critical thinking",
    },

    {
      name: "Analytical Reasoning",
      questions: "1 section",
      time: "35 minutes",
      icon: "🧠",
      description:
        "Understand relationships and draw logical conclusions from given conditions",
    },

    {
      name: "Reading Comprehension",
      questions: "1 section",
      time: "35 minutes",
      icon: "▤",
      description:
        "Read complex texts with understanding and insight across various topics",
    },
  ],


  /* =====================================================
     EXPERIMENTAL SECTION
     + WRITING SAMPLE
  ===================================================== */

  structureNotes: [
    {
      icon: "◆",

      title: "Experimental Section",

      description:
        "Unscored section used to test new questions for future exams. This section is not identified during the test.",
    },

    {
      icon: "✎",

      title: "Writing Sample",

      description:
        "Unscored but sent to law schools to demonstrate your writing ability and argumentative skills.",
    },
  ],


  /* =====================================================
     SCORING
  ===================================================== */

  scoringIntro:
    "The LSAT is scored on a scale of 120 to 180, with 180 being the highest possible score. Your score is based on the number of questions answered correctly (your raw score), which is then converted to the LSAT scale.",


  scoring: [
    {
      name: "Score Range",

      score: "120-180",

      description:
        "LSAT is scored on a standardized scale with 180 being the highest possible score",
    },

    {
      name: "Average Score",

      score: "~150",

      description:
        "The median score representing the 50th percentile of all test takers",
    },

    {
      name: "Score Validity",

      score: "5 Years",

      description:
        "LSAT scores remain valid for law school applications for five years from test date",
    },
  ],


  /* =====================================================
     SCORE STATISTICS
  ===================================================== */

  scoreStats: [
    {
      label: "Average Score",
      value: "150",
    },

    {
      label: "75th Percentile",
      value: "157",
    },

    {
      label: "90th Percentile",
      value: "166",
    },
  ],


  /* =====================================================
     GREEN SCORE VALIDITY CALLOUT
  ===================================================== */

  scoreValidity: {
    icon: "↗",

    title: "Score Validity",

    description:
      "LSAT scores are valid for 5 years from the test date, giving you flexibility in your law school application timeline.",
  },


  /* =====================================================
     KEY FEATURES
  ===================================================== */

  keyFeatures: [
    {
      title: "Critical for Law School",

      description:
        "Essential requirement for law school admissions across the US, Canada, and internationally",

      icon: "⚖",
    },

    {
      title: "Skills Assessment",

      description:
        "Tests critical thinking, analytical reasoning, and reading comprehension skills essential for law school success",

      icon: "🧠",
    },

    {
      title: "Standardized Excellence",

      description:
        "Standardized format ensures fair assessment and comparison across all law school applicants",

      icon: "◆",
    },
  ],


  /* =====================================================
     REASONS
  ===================================================== */

  reasons: [
    {
      title: "Expert LSAT instructors",

      description:
        "Learn from qualified instructors with extensive experience in LSAT preparation and law school admissions consulting.",

      icon: "♟",
    },

    {
      title: "Advanced logical reasoning training",

      description:
        "Master critical thinking skills with comprehensive training in argument analysis, logical reasoning, and problem-solving techniques.",

      icon: "◆",
    },

    {
      title: "Comprehensive study materials",

      description:
        "Access extensive LSAT preparation materials, practice questions, and detailed explanations.",

      icon: "▤",
    },

    {
      title: "Personalized preparation",

      description:
        "Get a customized study plan based on your current level, target score, and law school goals.",

      icon: "♟",
    },

    {
      title: "Regular practice tests",

      description:
        "Take full-length practice tests under realistic test conditions and receive detailed performance analysis.",

      icon: "▣",
    },
  ],


  journeyTitle:
    "Ready to Start Your LSAT Journey?",

  journeyText:
    "Join successful students who achieved their target LSAT scores with Wayabroad",

  journeyButton:
    "Contact us today to start your LSAT preparation!",
},

  // ==========================================
  // MCAT
  // ==========================================
  mcat: {
    name: "MCAT",
    fullName: "MCAT (Medical College Admission Test)",

    breadcrumb: "wayabroad India / MCAT Preparation",

    description:
      "Prepare for the MCAT with comprehensive resources, expert instruction, and structured practice.",

    whatIsTitle: "About the MCAT",

    whatIsIt:
      "The Medical College Admission Test (MCAT) is a standardized, multiple-choice examination designed to assess problem solving, critical thinking, and knowledge of natural, behavioral, and social science concepts and principles prerequisite to the study of medicine. It is required for admission to most medical schools in the United States and Canada.",

    highlights: [
      {
        label: "Duration",
        value: "7.5 hours",
      },
      {
        label: "Score Range",
        value: "472-528",
      },
    ],

    sections: [
      {
        name: "Chemical & Physical Foundations",
        questions: "59 questions",
        time: "95 minutes",
        icon: "⚗",
        description:
          "Tests understanding of chemical and physical principles that underlie the mechanisms operating in the human body.",
      },
      {
        name: "Critical Analysis & Reasoning",
        questions: "53 questions",
        time: "90 minutes",
        icon: "▤",
        description:
          "Measures analysis and reasoning skills through passages in the social sciences and humanities.",
      },
      {
        name: "Biological & Biochemical Foundations",
        questions: "59 questions",
        time: "95 minutes",
        icon: "🧬",
        description:
          "Assesses knowledge of biological and biochemical concepts important to medicine.",
      },
      {
        name: "Psychological, Social & Biological",
        questions: "59 questions",
        time: "95 minutes",
        icon: "🧠",
        description:
          "Tests understanding of psychological, social, and biological determinants of behavior.",
      },
    ],

    scoringIntro:
      "The MCAT is scored on a scale from 472 to 528, with 528 being the highest possible score. The test is divided into four sections, each scored from 118 to 132. Your total score is the sum of the four section scores.",

    scoring: [
      {
        name: "Score Range",
        score: "472-528",
        description:
          "Overall MCAT score range",
      },
      {
        name: "Average Score",
        score: "500",
        description:
          "Average score",
      },
      {
        name: "Top 10%",
        score: "515+",
        description:
          "Score representing the top 10%",
      },
    ],

    highlights: [
      {
        label: "Duration",
        value: "7.5 hours",
      },
      {
        label: "Score Range",
        value: "472-528",
      },
      {
        label: "Average Score",
        value: "500",
      },
      {
        label: "Top 10%",
        value: "515+",
      },
    ],

    testAttempts: {
      icon: "▤",
      title: "Test Attempts",
      description:
        "You can take the MCAT up to 3 times in one year, 4 times in two years, and 7 times in a lifetime. Medical schools consider all your scores, so prepare thoroughly.",
    },

    journeyButton: "Register for MCAT",
  },

  // ==========================================
  // PTE
  // ==========================================
  pte: {
    name: "PTE Academic",
    fullName: "PTE Academic (Pearson Test of English)",

    breadcrumb: "wayabroad India / PTE Academic Preparation",

    description:
      "Master computer-based English testing with our comprehensive PTE Academic preparation program",

    whatIsTitle: "What is PTE Academic?",

    whatIsIt:
      "PTE Academic is a computer-based academic English language test designed for non-native English speakers who need to demonstrate their English language proficiency for academic purposes. It's widely recognized by universities, colleges, and governments around the world, with results typically available within 48 hours of taking the test.",

    highlights: [
    {
      icon: "◴",
      label: "Fast Results:",
      value: "Get your scores typically within 48 hours",
    },
  ],

    sections: [
      {
        name: "Speaking & Writing",
        questions: "Multiple tasks",
        time: "77-93 minutes",
        icon: "✎",
        description:
          "Personal introduction, Read aloud, Repeat sentence, Describe image, Essay writing",
      },
      {
        name: "Reading",
        questions: "Multiple tasks",
        time: "32-41 minutes",
        icon: "▤",
        description:
          "Multiple-choice questions, Re-order paragraphs, Fill in the blanks",
      },
      {
        name: "Listening",
        questions: "Multiple tasks",
        time: "45-57 minutes",
        icon: "🎧",
        description:
          "Summarize spoken text, Multiple-choice questions, Write from dictation",
      },
    ],

    scoringIntro:
      "PTE Academic uses an automated scoring system to ensure unbiased results. The test is scored on a scale of 10-90, with 90 being the highest possible score. Your score report includes both communicative skills and enabling skills scores.",

    scoring: [
      {
        name: "Total Score",
        score: "10-90",
        description:
          "Overall score combining all skills with automated scoring system",
      },
      {
        name: "Communicative Skills",
        score: "10-90 each",
        description:
          "Listening, Reading, Speaking, Writing - core language abilities",
      },
      {
        name: "Enabling Skills",
        score: "10-90 each",
        description:
          "Grammar, Oral Fluency, Pronunciation, Vocabulary - supporting skills",
      },
    ],

    globalRecognition: {
      icon: "●",
      title: "Global Recognition",
      description:
        "Recognized by thousands of academic institutions, professional organizations, and governments worldwide, including in the UK, Australia, USA, Canada, and New Zealand.",
    },

    keyFeatures: [
      {
        title: "100% Computer-Based",
        description:
          "Entirely computer-based test with automated scoring for unbiased and consistent results",
        icon: "💻",
      },
      {
        title: "Fast Results",
        description:
          "Get your scores typically within 48 hours, much faster than traditional paper-based tests",
        icon: "⚡",
      },
      {
        title: "Widely Accepted",
        description:
          "Accepted by thousands of universities and institutions worldwide for academic admissions",
        icon: "🌎",
      },
    ],

    reasons: [
      {
        title: "Expert PTE Academic instructors",
        description:
          "Learn from qualified instructors with extensive experience in PTE Academic preparation and computer-based testing strategies.",
        icon: "♟",
      },
      {
        title: "AI-powered speaking practice",
        description:
          "Practice with advanced AI technology similar to the actual PTE test environment to improve your speaking performance and pronunciation.",
        icon: "🧠",
      },
      {
        title: "Comprehensive mock tests and practice materials",
        description:
          "Access full-length computer-based practice tests, sample questions, and detailed explanations for all PTE Academic tasks.",
        icon: "◆",
      },
      {
        title: "Task-specific strategies and techniques",
        description:
          "Master specific approaches for each PTE task type including time management and scoring optimization techniques.",
        icon: "▣",
      },
      {
        title: "Flexible online and offline classes",
        description:
          "Choose from various learning modes including online sessions, in-person classes, and self-paced study options to fit your schedule.",
        icon: "◉",
      },
    ],

    journeyTitle: "Ready to Ace Your PTE Academic Test?",
    journeyText:
      "Join thousands of successful students who achieved their target PTE scores with Wayabroad",
    journeyButton: "Book Your PTE Test Now - Contact us today!",
  },

  // ==========================================
  // DUOLINGO ENGLISH TEST
  // ==========================================
  duolingo: {
    name: "Duolingo English Test",
    fullName: "Duolingo English Test",

    breadcrumb: "wayabroad India / Duolingo English Test Preparation",

    description:
      "Prepare for the Duolingo English Test with focused practice and expert guidance.",

    whatIsTitle: "About Duolingo English Test",

    whatIsIt:
      "The Duolingo English Test is a modern language proficiency tool designed for today's international students and institutions. It provides a convenient, fast, and affordable way to certify English language proficiency.",

    highlights: [
    {
      variant: "banner",
      icon: "◷",
      label: "Fast & Convenient:",
      value: "Take the test online, anytime, anywhere. Results in 48 hours.",
    },
  ],

    sections: [
      {
        name: "Adaptive Test",
        questions: "Computer-adaptive test",
        time: "45 minutes",
        icon: "⚡",
        description:
          "Computer-adaptive test that adjusts to your skill level in real-time.",
      },
      {
        name: "Skills Assessed",
        questions: "Reading • Writing • Listening • Speaking",
        time: "Included in adaptive test",
        icon: "🧠",
        description:
          "Reading, Writing, Listening, and Speaking",
      },
      {
        name: "Video Interview",
        questions: "Recorded video responses",
        time: "10 minutes",
        icon: "🎥",
        description:
          "Recorded video responses to showcase your speaking ability.",
      },
    ],

    scoringIntro:
      "The test is scored on a scale of 10-160, in 5-point increments. The score is based on the CEFR (Common European Framework of Reference) levels from A1 to C2.",

    scoring: [
      {
        name: "Score Range",
        score: "10-160",
        description:
          "Overall score range",
      },
      {
        name: "CEFR Levels",
        score: "A1 - C2",
        description:
          "Score interpretation based on CEFR levels",
      },
    ],

    globalRecognition: {
      icon: "🌐",
      title: "Widely Accepted",
      description:
        "Recognized by thousands of universities and institutions worldwide, including in the US, UK, Canada, and Australia.",
    },

    journeyButton: "Register for Duolingo Test",
  },
};

export default exams;
