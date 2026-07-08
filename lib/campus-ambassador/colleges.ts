// Curated list of top Indian colleges/universities for the searchable dropdown.
// Users can also type a custom college name if theirs isn't listed.
export const INDIAN_COLLEGES = [
  // IITs
  "IIT Bombay", "IIT Delhi", "IIT Kanpur", "IIT Kharagpur", "IIT Madras", "IIT Roorkee",
  "IIT Guwahati", "IIT Hyderabad", "IIT Indore", "IIT (BHU) Varanasi", "IIT Gandhinagar",
  "IIT Ropar", "IIT Patna", "IIT Bhubaneswar", "IIT Mandi", "IIT Jodhpur", "IIT Palakkad",
  "IIT Tirupati", "IIT Dhanbad (ISM)", "IIT Bhilai", "IIT Goa", "IIT Jammu", "IIT Dharwad",

  // NITs
  "NIT Trichy", "NIT Warangal", "NIT Surathkal", "NIT Rourkela", "NIT Calicut",
  "NIT Durgapur", "NIT Kurukshetra", "NIT Jaipur (MNIT)", "NIT Allahabad (MNNIT)",
  "NIT Bhopal (MANIT)", "NIT Nagpur (VNIT)", "NIT Silchar", "NIT Hamirpur", "NIT Jalandhar",
  "NIT Patna", "NIT Raipur", "NIT Agartala", "NIT Delhi", "NIT Goa", "NIT Manipur",
  "NIT Meghalaya", "NIT Mizoram", "NIT Nagaland", "NIT Puducherry", "NIT Sikkim", "NIT Srinagar", "NIT Uttarakhand", "NIT Andhra Pradesh (Tadepalligudem)", "NIT Arunachal Pradesh",

  // IIITs
  "IIIT Hyderabad", "IIIT Bangalore", "IIIT Delhi", "IIIT Allahabad", "IIIT Gwalior",
  "IIIT Jabalpur", "IIIT Kancheepuram", "IIIT Kota", "IIIT Lucknow", "IIIT Nagpur",
  "IIIT Pune", "IIIT Ranchi", "IIIT Una", "IIIT Vadodara", "IIIT Sri City", "IIIT Bhopal",
  "IIIT Bhagalpur", "IIIT Kalyani", "IIIT Sonepat", "IIIT Surat", "IIIT Trichy", "IIIT Guwahati",

  // IIMs (management)
  "IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "IIM Kozhikode",
  "IIM Indore", "IIM Raipur", "IIM Ranchi", "IIM Rohtak", "IIM Udaipur", "IIM Kashipur",
  "IIM Nagpur", "IIM Visakhapatnam", "IIM Bodh Gaya", "IIM Amritsar", "IIM Sambalpur", "IIM Sirmaur", "IIM Jammu",

  // Top Central/State Universities
  "Delhi University (DU)", "Jawaharlal Nehru University (JNU)", "Banaras Hindu University (BHU)",
  "Jamia Millia Islamia", "University of Hyderabad", "Aligarh Muslim University (AMU)",
  "Anna University", "Jadavpur University", "University of Calcutta", "University of Mumbai",
  "University of Pune (SPPU)", "Osmania University", "Panjab University", "VIT Vellore",
  "VIT Chennai", "VIT Bhopal", "VIT AP", "SRM Institute of Science and Technology",
  "Manipal Institute of Technology", "Amity University Noida", "Amity University Gurgaon",
  "Lovely Professional University (LPU)", "Chandigarh University", "Thapar Institute of Engineering and Technology",
  "BITS Pilani", "BITS Pilani Goa", "BITS Pilani Hyderabad", "DA-IICT Gandhinagar",
  "Symbiosis Institute of Technology, Pune", "Nirma University, Ahmedabad", "PES University, Bangalore",
  "RV College of Engineering, Bangalore", "BMS College of Engineering, Bangalore", "MS Ramaiah Institute of Technology, Bangalore",
  "Dayananda Sagar College of Engineering, Bangalore", "PSG College of Technology, Coimbatore",
  "Sri Sivasubramaniya Nadar (SSN) College of Engineering", "College of Engineering, Guindy (CEG)",
  "Netaji Subhas University of Technology (NSUT), Delhi", "Delhi Technological University (DTU)",
  "Indraprastha Institute of Information Technology, Delhi (IIIT-D)", "Guru Gobind Singh Indraprastha University (GGSIPU)",
  "Jaypee Institute of Information Technology, Noida", "KIIT University, Bhubaneswar",
  "SOA University (ITER), Bhubaneswar", "Vellore Institute of Technology (VIT)", "SASTRA University, Thanjavur",
  "Kalasalingam University", "Karunya Institute of Technology and Sciences", "Amrita Vishwa Vidyapeetham, Coimbatore",
  "Christ University, Bangalore", "Mumbai University Institute of Chemical Technology (ICT)",
  "Veermata Jijabai Technological Institute (VJTI), Mumbai", "Sardar Patel Institute of Technology, Mumbai",
  "College of Engineering Pune (COEP)", "Government College of Engineering, Pune",
  "PICT Pune", "MIT World Peace University, Pune", "Symbiosis International University, Pune",
  "Jaipur Engineering College and Research Centre", "Malaviya National Institute of Technology, Jaipur",
  "Rajasthan Technical University, Kota", "Institute of Engineering and Technology, Lucknow",
  "Harcourt Butler Technical University, Kanpur", "Madan Mohan Malaviya University of Technology, Gorakhpur",
  "Graphic Era University, Dehradun", "Uttarakhand Technical University", "Punjab Engineering College (PEC), Chandigarh",
  "Guru Nanak Dev Engineering College, Ludhiana", "Kurukshetra University", "Maharshi Dayanand University, Rohtak",
  "University of Petroleum and Energy Studies (UPES), Dehradun", "Galgotias University, Greater Noida",
  "Sharda University, Greater Noida", "Bennett University, Greater Noida", "Shiv Nadar University, Greater Noida",
  "GLA University, Mathura", "Chitkara University, Punjab", "Vignan's Foundation for Science, Technology & Research",
  "KL University (Koneru Lakshmaiah), Vijayawada", "GITAM University, Visakhapatnam",
  "Andhra University, Visakhapatnam", "JNTU Hyderabad", "JNTU Kakinada", "JNTU Anantapur",
  "CMR Institute of Technology, Hyderabad", "Vasavi College of Engineering, Hyderabad",
  "CBIT Hyderabad", "MVSR Engineering College, Hyderabad", "National Law School of India University (NLSIU), Bangalore",
  "Presidency University, Bangalore", "Alliance University, Bangalore", "Jain University, Bangalore",
  "Ramaiah Institute of Management Studies", "IFIM College, Bangalore", "Mount Carmel College, Bangalore",
  "St. Xavier's College, Mumbai", "St. Xavier's College, Kolkata", "Presidency University, Kolkata",
  "Fergusson College, Pune", "Loyola College, Chennai", "Madras Christian College", "Stella Maris College, Chennai",
  "Lady Shri Ram College, Delhi", "Shri Ram College of Commerce (SRCC), Delhi", "Hindu College, Delhi",
  "Hansraj College, Delhi", "Miranda House, Delhi", "St. Stephen's College, Delhi",
  "Ramjas College, Delhi", "Kirori Mal College, Delhi",

  // Medical
  "All India Institute of Medical Sciences (AIIMS), Delhi", "Christian Medical College (CMC), Vellore",
  "Maulana Azad Medical College, Delhi", "Grant Medical College, Mumbai", "King George's Medical University, Lucknow",

  // Other
  "Other (not listed)",
] as const

export type CollegeName = (typeof INDIAN_COLLEGES)[number]
