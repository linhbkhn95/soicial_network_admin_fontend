import generateCustomers from "./customers";
import generateCategories from "./categories";
import generateProducts from "./products";
import generateCommands from "./commands";
import generateReviews from "./reviews";
import generatePayments from "./payment";

import generateCompanies from "./companies";
import generateDrivers from "./drivers";
import generateVehicles from "./vehicles";
import generateIncomes from "./incomes";
import generateFleet from "./fleets";

import finalize from "./finalize";

export models from "./models";

export default (options = { serializeDate: true }) => {
  const db = {};
  db.customers = generateCustomers(db, options);
  db.categories = generateCategories(db, options);
  db.products = generateProducts(db, options);
  db.commands = generateCommands(db, options);
  db.reviews = generateReviews(db, options);
  db.fleets = generateFleet(db, options);

  db.companies = generateCompanies(db, options);
  db.drivers = generateDrivers(db, options);
  db.vehicles = generateVehicles(db, options);
  db.payments = generatePayments(db, options);
  db.incomes = generateIncomes(db, options);

  finalize(db);

  return db;
};
