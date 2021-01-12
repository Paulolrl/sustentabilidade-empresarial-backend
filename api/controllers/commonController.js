'use strict';

exports.getCategories = function(req, res) {
  res.json([
    { value: 'COMPANY', label: 'Corporação' },
    { value: 'UNIVERSITY', label: 'Universidade' },
    { value: 'LAB', label: 'Laboratório Vivo' },
    { value: 'HIDS', label: 'HIDS' },
    { value: 'OTHER', label: 'Outros' }
  ])
};

exports.getSectors = function(req, res) {
  res.json([
    { value: 'AGR', label: 'Agriculture, Hunting, Forestry and Fishing' },
    { value: 'MIN', label: 'Mining and Quarrying' },
    { value: 'FOOD', label: 'Food, Beverages and Tobacco' },
    { value: 'TEX', label: 'Textiles and Textile Products' },
    { value: 'LEA', label: 'Leather, Leather and Footwear' },
    { value: 'WOOD', label: 'Wood and Products of Wood and Cork' },
    { value: 'PULP', label: 'Pulp, Paper, Paper , Printing and Publishing' },
    { value: 'COKE', label: 'Coke, Refined Petroleum and Nuclear Fuel' },
    { value: 'CHEM', label: 'Chemicals and Chemical Products' },
    { value: 'RUB', label: 'Rubber and Plastics' },
    { value: 'NMET', label: 'Other Non-Metallic Mineral' },
    { value: 'METAL', label: 'Basic Metals and Fabricated Metal' },
    { value: 'MACH', label: 'Machinery, Nec' },
    { value: 'ELEC', label: 'Electrical and Optical Equipment' },
    { value: 'TRANS', label: 'Transport Equipment' },
    { value: 'MANU', label: 'Manufacturing, Nec; Recycling' },
    { value: 'SUP', label: 'Electricity, Gas and Water Supply' },
    { value: 'CONST', label: 'Construction' },
    { value: 'MOTOR', label: 'Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel' },
    { value: 'TRADE', label: 'Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles' },
    { value: 'MOTORT', label: 'Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods' },
    { value: 'HOTEL', label: 'Hotels and Restaurants' },
    { value: 'INTRANS', label: 'Inland Transport' },
    { value: 'WTRANS', label: 'Water Transport' },
    { value: 'ATRANS', label: 'Air Transport' },
    { value: 'OTRANS', label: 'Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies' },
    { value: 'POST', label: 'Post and Telecommunications' },
    { value: 'FIN', label: 'Financial Intermediation' },
    { value: 'REST', label: 'Real Estate Activities' },
    { value: 'RENT', label: 'Renting of M&Eq and Other Business Activities' },
    { value: 'PUB', label: 'Public Admin and Defence; Compulsory Social Security' },
    { value: 'EDU', label: 'Education' },
    { value: 'HEALTH', label: 'Health and Social Work' },
    { value: 'COMM', label: 'Other Community, Social and Personal Services' },
    { value: 'PRIV', label: 'Private Households with Employed Persons' }
  ])
}




exports.getSizes = function(req, res){
  res.json([
    { value: 'MICRO', label: 'até 19 funcionários' },
    { value: 'SMALL', label: 'de 20 a 99 funcionários' },
    { value: 'MEDIUM', label: '100 a 499 funcionários' },
    { value: 'LARGE', label: 'mais de 500 funcionários' }
  ])
}
