'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var company = {
  id: 'id',
  name: 'name',
  lat: 'lat',
  lon: 'lon',
  status: 'status',
  logoUrl: 'logo_url',
  phone: 'phone'
};

var me = {
  companyId: 'fleet_id',
  company: 'fleet',
  status: 'status',
  id: 'id',
  userName: 'phone',
  fullName: 'fullname',
  avatar: 'avatar',
  phone: 'phone',
  password: 'password',
  email: 'email',
  role: 'role',
  bankAccount: 'bank_account',
  bankName: 'bank_name',
  contract: 'contract',
  group: 'group'
};

var driver = {
  id: 'id',
  fullName: 'fullname',
  phone: 'phone',
  state: 'state',
  status: 'status',
  vehicle: 'vehicle',
  runtime: 'totalDuration',

  profilePicture: 'avatar',
  income: 'totalEarnings',
  rate: 'rating',
  seat: 'seat',
  onlineStatus: 'online_status'
};
var bank_account = {
  bank_account: 'number_account_bank',
  fullname: 'fullname_account',
  city_bank: 'city_bank',
  branch: 'branch'
};
var fleet = {
  id: 'id',
  type: 'type',
  name: 'name',
  email: 'email',
  phone: 'phone',
  image_scan: 'image_scan',
  number_account_bank: 'number_account_bank',
  fullname_account: 'fullname_account',
  city_bank: 'city_bank',
  branch: 'branch',
  logo: 'logo',
  number_of_vehicle: 'number_of_vehicle',
  online_hour_reward: 'online_hour_reward',
  contract_path: 'contract_path',
  owner_id_scan_path: 'owner_id_scan_path',
  status: 'status'
};
var payment = {
  id: 'id',
  code: 'code',
  time: 'time',
  total_money: 'total_money',
  total_vehicle: 'total_vehicle',
  runtime: 'runtime',
  time_arg: 'time_arge',
  success: 'success',
  bonus: 'bonus'
};
var income = {
  id: 'id',
  plate: 'plate',
  driver: 'owner',
  vehicle: 'vehicle',
  customer_payment_money: 'preferred_payment_mode',
  customer_payment_card: 'customer_payment_card',
  actually_received: 'actually_received',
  total_money: 'driver_earnings',
  be_received: 'be_received',
  runtime: 'duration',
  driver_name: 'driver_name',
  driver_earnings: 'driver_earnings',
  drop_location_address: 'drop_location_address',
  engagement_id: 'engagement_id',
  status: 'status',
  request_made_on: 'request_made_on',
  drop_time: 'drop_time',
  accept_time: 'accept_time',
  pickup_time: 'pickup_time',
  pickup_location_address: 'pickup_location_address',
  fleet_id: 'fleet_id',
  user_id: 'user_id',
  user_name: 'user_name',
  preferred_payment_mode: 'preferred_payment_mode'
};

var vehicleEarningDetail = {
  duration: 'duration',
  id: 'id',
  driverId: 'driver_id',
  driverName: 'driver_name',
  acceptTime: 'accept_time',
  debtAmount: 'debt_amount',
  dropLocationAddress: 'drop_location_address',
  dropTime: 'drop_time',
  engagementDate: 'engagement_date',
  fleetId: 'fleet_id',
  engagementId: 'engagement_id',
  phoneNo: 'phone_no',
  pickUpLocationAddress: 'pick_up_location_address',
  licensePlate: 'license_plate',
  pickupTime: 'pickup_time',
  preferredPaymentMode: 'preferred_payment_mode',
  requestMadeOn: 'request_made_on',
  status: 'status',
  userId: 'user_id',
  userName: 'user_name',
  vehicleType: 'vehicle_type',
  driverEarnings: 'driver_earnings',
  beEarnings: 'be_earnings',
  vatTax: 'vat_tax',
  tncnTax: 'tncn_tax',
  subCost: 'sub_cost',
  realEarning: 'real_earning',
  totalAmount: 'total_amount'
};

var vehicle = {
  id: 'id',
  driver: 'driver',
  driverId: 'current_driver_id',
  vehicleOwner: 'owner_name',
  plate: 'licence_plate',
  branch: 'mark',
  colour: 'color',
  seat: 'seat',
  year: 'manufactured_year',
  certificationNumber: 'inspection_number',
  certificationExpireDate: 'inspection_expire_date',
  insuranceNumber: 'insurance_number',
  insuranceExpireDate: 'insurance_expire_date',
  frontPicture: 'front_img',
  backPicture: 'back_img',
  leftPicture: 'left_img',
  rightPicture: 'right_img',
  certificationFront: 'vehicle_certification_front',
  certificationBack: 'vehicle_certification_back',
  certificationImg: 'inspection_img',
  insuranceFront: 'insuration_certification_front',
  insuranceBack: 'insuration_certification_back',
  insuranceImg: 'insurance_img',
  registrationFront: 'registration_front_img',
  registrationBack: 'registration_back_img',
  companyEnsign: 'ensign_img',
  company: 'fleet_name',
  companyExpireDate: 'ensign_expire_date',
  ensignNumber: 'ensign_number',
  ensignType: 'ensign_type',
  status: 'status',
  state: 'state',
  subBranch: 'model_code'
};

exports.default = {
  company: company,
  driver: driver,
  vehicle: vehicle,
  payment: payment,
  income: income,
  fleet: fleet,
  me: me,
  vehicleEarningDetail: vehicleEarningDetail,
  bank_account: bank_account
};
module.exports = exports['default'];