/* =============================================================
   Resort Booking System — Application Logic
   Modules: Login, Rooms, Booking, Guest Details, Payments, Reports
   ============================================================= */

// ── Data store ────────────────────────────────────────────────

const DB = {

  rooms: [
    { id: 1, number: "101", name: "Standard Single",    type: "single",  floor: 1, price: 75,  capacity: 1, beds: "1 Single",   features: ["Air Conditioning", "Free WiFi", "TV", "Wardrobe"],                          description: "A well-appointed single room on the ground floor, suitable for solo business or leisure travellers. Includes a work desk and en-suite bathroom.", available: true  },
    { id: 2, number: "102", name: "Standard Double",    type: "double",  floor: 1, price: 110, capacity: 2, beds: "1 Queen",    features: ["Air Conditioning", "Free WiFi", "TV", "Mini Fridge"],                        description: "Comfortable double room with a queen-sized bed. Ideal for couples or guests requiring extra space.", available: true  },
    { id: 3, number: "201", name: "Deluxe Double",      type: "double",  floor: 2, price: 145, capacity: 2, beds: "1 King",     features: ["Air Conditioning", "Free WiFi", "Smart TV", "Mini Bar", "Bathtub"],          description: "Upgraded double room featuring a king-sized bed, premium bedding, and a private bathtub.", available: true  },
    { id: 4, number: "202", name: "Twin Room",          type: "twin",    floor: 2, price: 120, capacity: 2, beds: "2 Singles",  features: ["Air Conditioning", "Free WiFi", "TV", "Wardrobe"],                          description: "Spacious twin room with two single beds. Well suited for friends or colleagues travelling together.", available: true  },
    { id: 5, number: "301", name: "Junior Suite",       type: "suite",   floor: 3, price: 210, capacity: 2, beds: "1 King",     features: ["Air Conditioning", "Free WiFi", "Smart TV", "Mini Bar", "Seating Area"],    description: "A junior suite with a separate seating area and upgraded amenities. Offers additional privacy and comfort.", available: true  },
    { id: 6, number: "302", name: "Executive Suite",    type: "suite",   floor: 3, price: 295, capacity: 3, beds: "1 King + Sofa Bed", features: ["Air Conditioning", "Free WiFi", "Smart TV", "Mini Bar", "Bathtub", "Balcony"], description: "Spacious executive suite with a private balcony, walk-in wardrobe, and full concierge service.", available: true  },
    { id: 7, number: "401", name: "Family Room",        type: "family",  floor: 4, price: 185, capacity: 4, beds: "1 King + 2 Singles", features: ["Air Conditioning", "Free WiFi", "TV", "Mini Fridge", "Extra Towels"], description: "Large family room accommodating up to four guests. Includes a separate sleeping area for children.", available: true  },
    { id: 8, number: "402", name: "Accessible Room",    type: "single",  floor: 1, price: 85,  capacity: 1, beds: "1 Queen",   features: ["Air Conditioning", "Free WiFi", "TV", "Roll-in Shower", "Grab Rails"],       description: "Fully accessible ground-floor room designed to accommodate guests with mobility requirements.", available: false },
  ],

  guests: [
    { id: 1, firstName: "Alice",  lastName: "Johnson",  email: "alice.j@email.com",   phone: "+1 555-0101", idType: "Passport",       idNumber: "P1234567",  address: "12 Maple St, Boston, MA",      dob: "1985-04-22" },
    { id: 2, firstName: "Bob",    lastName: "Martinez", email: "bob.m@email.com",     phone: "+1 555-0102", idType: "Driver License", idNumber: "DL-987654", address: "88 Oak Ave, Chicago, IL",      dob: "1990-11-08" },
    { id: 3, firstName: "Carol",  lastName: "White",    email: "carol.w@email.com",   phone: "+1 555-0103", idType: "Passport",       idNumber: "P9988776",  address: "5 Pine Rd, Houston, TX",       dob: "1978-07-15" },
    { id: 4, firstName: "David",  lastName: "Kim",      email: "david.k@email.com",   phone: "+1 555-0104", idType: "National ID",    idNumber: "NID-44521", address: "200 Elm St, Seattle, WA",      dob: "1995-02-28" },
    { id: 5, firstName: "Eva",    lastName: "Nguyen",   email: "eva.n@email.com",     phone: "+1 555-0105", idType: "Passport",       idNumber: "P7654321",  address: "17 Cedar Ln, Miami, FL",       dob: "1988-09-03" },
  ],

  bookings: [
    { id: 1001, guestId: 1, roomId: 1, checkIn: "2026-10-01", checkOut: "2026-10-05", nights: 4,  adults: 1, children: 0, status: "confirmed",  specialReq: "",                     createdAt: "2026-09-10" },
    { id: 1002, guestId: 2, roomId: 6, checkIn: "2026-10-08", checkOut: "2026-10-12", nights: 4,  adults: 2, children: 0, status: "confirmed",  specialReq: "Late check-in requested", createdAt: "2026-09-12" },
    { id: 1003, guestId: 3, roomId: 2, checkIn: "2026-10-15", checkOut: "2026-10-18", nights: 3,  adults: 2, children: 0, status: "pending",    specialReq: "",                     createdAt: "2026-09-18" },
    { id: 1004, guestId: 4, roomId: 4, checkIn: "2026-09-28", checkOut: "2026-09-30", nights: 2,  adults: 2, children: 0, status: "checked-in", specialReq: "Extra pillows",          createdAt: "2026-09-20" },
    { id: 1005, guestId: 5, roomId: 1, checkIn: "2026-10-20", checkOut: "2026-10-23", nights: 3,  adults: 1, children: 0, status: "pending",    specialReq: "",                     createdAt: "2026-09-21" },
  ],

  payments: [
    { id: 2001, bookingId: 1001, amount: 300, method: "Card",     status: "paid",    paidAt: "2026-09-10", ref: "TXN-8821A" },
    { id: 2002, bookingId: 1002, amount: 1180,method: "Card",     status: "paid",    paidAt: "2026-09-12", ref: "TXN-8822B" },
    { id: 2003, bookingId: 1003, amount: 330, method: "Transfer", status: "partial", paidAt: "2026-09-18", ref: "TXN-8823C" },
    { id: 2004, bookingId: 1004, amount: 240, method: "Cash",     status: "paid",    paidAt: "2026-09-20", ref: "TXN-8824D" },
    { id: 2005, bookingId: 1005, amount: 0,   method: "",         status: "unpaid",  paidAt: "",           ref: ""          },
  ],

  users: [
    { username: "admin",  password: "admin123",  role: "staff",  name: "Admin User"  },
    { username: "staff1", password: "staff123",  role: "staff",  name: "Jane Cooper" },
  ],
};

// ── Application state ─────────────────────────────────────────

const APP = {
  user:          null,        // logged-in user object
  currentPage:   "login",
  selectedRoom:  null,
  bookingDraft:  null,        // room + dates + guest before payment
  guestDraft:    null,
  editGuestId:   null,
};

// ── Router ────────────────────────────────────────────────────

const GUEST_PAGES  = ["rooms", "booking", "guest-details", "payment", "confirmation"];
const STAFF_PAGES  = ["dashboard", "manage-bookings", "manage-guests", "manage-payments", "reports"];

function navigate(page, params = {}) {
  // Auth guard — staff pages require login
  if (STAFF_PAGES.includes(page) && (!APP.user || APP.user.role !== "staff")) {
    navigate("login");
    return;
  }

  APP.currentPage = page;
  Object.assign(APP, params);

  // Show/hide sidebar
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.style.display = STAFF_PAGES.includes(page) ? "block" : "none";

  // Activate page
  document.querySelectorAll(".page").forEach(el => el.classList.remove("active"));
  const target = document.getElementById("page-" + page);
  if (target) target.classList.add("active");

  // Update sidebar active link
  document.querySelectorAll(".sidebar a[data-page]").forEach(a => {
    a.classList.toggle("active", a.dataset.page === page);
  });

  // Update top nav
  document.querySelectorAll(".top-nav a[data-page]").forEach(a => {
    a.classList.toggle("active", a.dataset.page === page);
  });

  // Render
  const renderers = {
    "rooms":           renderRooms,
    "booking":         renderBooking,
    "guest-details":   renderGuestDetails,
    "payment":         renderPayment,
    "confirmation":    renderConfirmation,
    "dashboard":       renderDashboard,
    "manage-bookings": renderManageBookings,
    "manage-guests":   renderManageGuests,
    "manage-payments": renderManagePayments,
    "reports":         renderReports,
  };

  if (renderers[page]) renderers[page]();

  // Scroll top
  const content = document.getElementById("content");
  if (content) content.scrollTop = 0;
}

// ── Auth ──────────────────────────────────────────────────────

function submitLogin(e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const role     = document.getElementById("login-role").value;

  const user = DB.users.find(u => u.username === username && u.password === password && u.role === role);
  if (!user) {
    showAlert("login-alert", "Invalid credentials. Check username, password and role.", "error");
    return;
  }

  APP.user = user;
  updateTopNav();

  if (role === "staff") {
    navigate("dashboard");
  } else {
    navigate("rooms");
  }
}

function logout() {
  APP.user = null;
  APP.selectedRoom = null;
  APP.bookingDraft = null;
  updateTopNav();
  navigate("login");
}

function updateTopNav() {
  const loggedIn = !!APP.user;

  el("nav-login-link")   && (el("nav-login-link").style.display   = loggedIn ? "none"   : "inline");
  el("nav-logout-link")  && (el("nav-logout-link").style.display  = loggedIn ? "inline" : "none");
  el("nav-staff-link")   && (el("nav-staff-link").style.display   = (loggedIn && APP.user.role === "staff") ? "inline" : "none");
  el("nav-rooms-link")   && (el("nav-rooms-link").style.display   = "inline");

  if (loggedIn && APP.user.role === "staff") {
    el("nav-username") && (el("nav-username").textContent = APP.user.name);
  }
}

// ── MODULE: Resort Rooms ──────────────────────────────────────

function renderRooms() {
  const typeFilter  = el("filter-type")   ? el("filter-type").value   : "";
  const cinFilter   = el("filter-cin")    ? el("filter-cin").value    : "";
  const coutFilter  = el("filter-cout")   ? el("filter-cout").value   : "";

  let rooms = DB.rooms;
  if (typeFilter) rooms = rooms.filter(r => r.type === typeFilter);

  const grid = el("rooms-grid");
  if (!grid) return;

  // Available rooms only for guests
  const display = APP.user ? rooms : rooms.filter(r => r.available);

  grid.innerHTML = display.map(room => `
    <div class="room-card">
      <div class="room-card-head">
        <h3>Room ${room.number} — ${room.name}</h3>
        <span class="room-type-badge">${room.type}</span>
      </div>
      <div class="room-card-body">
        <p class="room-desc">${room.description}</p>
        <div class="room-features">${room.features.map(f => `<span class="feature-tag">${f}</span>`).join("")}</div>
        <div style="font-size:0.82rem;color:#5d6d7e;margin-bottom:0.6rem;">
          Beds: ${room.beds} &nbsp;|&nbsp; Capacity: ${room.capacity} guest${room.capacity > 1 ? "s" : ""}
        </div>
        <div class="room-price">$${room.price} <span>/ night</span></div>
        ${room.available
          ? `<button class="btn btn-primary btn-block" onclick="selectRoomForBooking(${room.id})">Book Now</button>`
          : `<div class="room-unavailable">Not Available</div>`
        }
      </div>
    </div>
  `).join("");
}

function applyRoomFilter() {
  renderRooms();
}

function selectRoomForBooking(roomId) {
  APP.selectedRoom = DB.rooms.find(r => r.id === roomId);
  navigate("booking");
}

// ── MODULE: Booking ───────────────────────────────────────────

function renderBooking() {
  const room = APP.selectedRoom;
  if (!room) { navigate("rooms"); return; }

  el("bk-room-number").textContent = `Room ${room.number}`;
  el("bk-room-name").textContent   = room.name;
  el("bk-room-type").textContent   = capitalize(room.type);
  el("bk-room-price").textContent  = `$${room.price} / night`;

  const today = todayISO();
  el("bk-checkin").min  = today;
  el("bk-checkout").min = today;
  el("bk-checkin").value  = "";
  el("bk-checkout").value = "";

  clearAlert("bk-alert");
  el("bk-summary-box").style.display = "none";
}

function updateBookingSummary() {
  const cin  = el("bk-checkin").value;
  const cout = el("bk-checkout").value;
  if (!cin || !cout || cin >= cout) {
    el("bk-summary-box").style.display = "none";
    return;
  }
  const nights = nightsBetween(cin, cout);
  const total  = nights * APP.selectedRoom.price;
  el("bk-nights-val").textContent = `${nights} night${nights !== 1 ? "s" : ""}`;
  el("bk-rate-val").textContent   = `$${APP.selectedRoom.price} / night`;
  el("bk-total-val").textContent  = `$${total}`;
  el("bk-summary-box").style.display = "block";
}

function submitBooking(e) {
  e.preventDefault();
  const cin    = el("bk-checkin").value;
  const cout   = el("bk-checkout").value;
  const adults = parseInt(el("bk-adults").value) || 1;
  const children = parseInt(el("bk-children").value) || 0;
  const req    = el("bk-special").value.trim();

  if (!cin || !cout) {
    showAlert("bk-alert", "Please select check-in and check-out dates.", "error"); return;
  }
  if (cin >= cout) {
    showAlert("bk-alert", "Check-out date must be after check-in date.", "error"); return;
  }
  if (adults + children > APP.selectedRoom.capacity) {
    showAlert("bk-alert", `This room accommodates a maximum of ${APP.selectedRoom.capacity} guest(s).`, "error"); return;
  }

  const nights = nightsBetween(cin, cout);
  APP.bookingDraft = {
    room: APP.selectedRoom,
    checkIn: cin, checkOut: cout,
    nights, adults, children,
    total: nights * APP.selectedRoom.price,
    specialReq: req,
  };

  navigate("guest-details");
}

// ── MODULE: Guest Details ─────────────────────────────────────

function renderGuestDetails() {
  clearAlert("gd-alert");

  // Pre-fill if returning guest found by email
  el("gd-firstname").value = "";
  el("gd-lastname").value  = "";
  el("gd-email").value     = "";
  el("gd-phone").value     = "";
  el("gd-address").value   = "";
  el("gd-idtype").value    = "Passport";
  el("gd-idnumber").value  = "";
  el("gd-dob").value       = "";

  updateGDSummary();
}

function updateGDSummary() {
  if (!APP.bookingDraft) return;
  const b = APP.bookingDraft;
  el("gd-sum-room").textContent    = `Room ${b.room.number} — ${b.room.name}`;
  el("gd-sum-checkin").textContent = fmtDate(b.checkIn);
  el("gd-sum-checkout").textContent= fmtDate(b.checkOut);
  el("gd-sum-nights").textContent  = `${b.nights} night${b.nights !== 1 ? "s" : ""}`;
  el("gd-sum-total").textContent   = `$${b.total}`;
}

function lookupGuest() {
  const email = el("gd-email").value.trim().toLowerCase();
  if (!email) return;
  const guest = DB.guests.find(g => g.email.toLowerCase() === email);
  if (guest) {
    el("gd-firstname").value  = guest.firstName;
    el("gd-lastname").value   = guest.lastName;
    el("gd-phone").value      = guest.phone;
    el("gd-address").value    = guest.address;
    el("gd-idtype").value     = guest.idType;
    el("gd-idnumber").value   = guest.idNumber;
    el("gd-dob").value        = guest.dob;
    showAlert("gd-alert", "Returning guest found. Details pre-filled.", "info");
    APP.editGuestId = guest.id;
  } else {
    APP.editGuestId = null;
  }
}

function submitGuestDetails(e) {
  e.preventDefault();
  const firstName = el("gd-firstname").value.trim();
  const lastName  = el("gd-lastname").value.trim();
  const email     = el("gd-email").value.trim();
  const phone     = el("gd-phone").value.trim();
  const address   = el("gd-address").value.trim();
  const idType    = el("gd-idtype").value;
  const idNumber  = el("gd-idnumber").value.trim();
  const dob       = el("gd-dob").value;

  if (!firstName || !lastName || !email || !phone || !idNumber) {
    showAlert("gd-alert", "Please fill in all required fields.", "error"); return;
  }

  // Upsert guest record
  let guest;
  if (APP.editGuestId) {
    guest = DB.guests.find(g => g.id === APP.editGuestId);
    Object.assign(guest, { firstName, lastName, email, phone, address, idType, idNumber, dob });
  } else {
    guest = { id: DB.guests.length + 1, firstName, lastName, email, phone, address, idType, idNumber, dob };
    DB.guests.push(guest);
  }

  APP.guestDraft = guest;
  navigate("payment");
}

// ── MODULE: Payments ──────────────────────────────────────────

function renderPayment() {
  if (!APP.bookingDraft || !APP.guestDraft) { navigate("rooms"); return; }
  const b = APP.bookingDraft;
  const g = APP.guestDraft;

  el("pay-guest").textContent   = `${g.firstName} ${g.lastName}`;
  el("pay-room").textContent    = `Room ${b.room.number} — ${b.room.name}`;
  el("pay-checkin").textContent = fmtDate(b.checkIn);
  el("pay-checkout").textContent= fmtDate(b.checkOut);
  el("pay-nights").textContent  = `${b.nights} night${b.nights !== 1 ? "s" : ""}`;
  el("pay-rate").textContent    = `$${b.room.price} / night`;
  el("pay-total").textContent   = `$${b.total}`;

  clearAlert("pay-alert");
  toggleCardFields();
}

function toggleCardFields() {
  const method = el("pay-method") ? el("pay-method").value : "";
  const cf = el("card-fields");
  if (cf) cf.style.display = method === "Card" ? "block" : "none";
}

function submitPayment(e) {
  e.preventDefault();
  const method = el("pay-method").value;

  if (method === "Card") {
    const num    = el("card-number").value.replace(/\s/g, "");
    const expiry = el("card-expiry").value.trim();
    const cvv    = el("card-cvv").value.trim();
    if (num.length < 16 || !expiry || cvv.length < 3) {
      showAlert("pay-alert", "Please enter valid card details.", "error"); return;
    }
  }

  const b = APP.bookingDraft;
  const g = APP.guestDraft;

  // Create booking record
  const newBooking = {
    id:         1000 + DB.bookings.length + 1,
    guestId:    g.id,
    roomId:     b.room.id,
    checkIn:    b.checkIn,
    checkOut:   b.checkOut,
    nights:     b.nights,
    adults:     b.adults,
    children:   b.children,
    status:     "confirmed",
    specialReq: b.specialReq,
    createdAt:  todayISO(),
  };
  DB.bookings.push(newBooking);

  // Create payment record
  const newPayment = {
    id:        2000 + DB.payments.length + 1,
    bookingId: newBooking.id,
    amount:    b.total,
    method,
    status:    "paid",
    paidAt:    todayISO(),
    ref:       "TXN-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
  };
  DB.payments.push(newPayment);

  APP.lastBooking = newBooking;
  APP.lastPayment = newPayment;

  navigate("confirmation");
}

function renderConfirmation() {
  const bk = APP.lastBooking;
  const py = APP.lastPayment;
  if (!bk || !py) { navigate("rooms"); return; }

  const guest = DB.guests.find(g => g.id === bk.guestId);
  const room  = DB.rooms.find(r => r.id === bk.roomId);

  el("conf-booking-id").textContent = `#${bk.id}`;
  el("conf-guest").textContent      = guest ? `${guest.firstName} ${guest.lastName}` : "—";
  el("conf-room").textContent       = room ? `Room ${room.number} — ${room.name}` : "—";
  el("conf-checkin").textContent    = fmtDate(bk.checkIn);
  el("conf-checkout").textContent   = fmtDate(bk.checkOut);
  el("conf-nights").textContent     = `${bk.nights} night${bk.nights !== 1 ? "s" : ""}`;
  el("conf-amount").textContent     = `$${py.amount}`;
  el("conf-method").textContent     = py.method;
  el("conf-ref").textContent        = py.ref;
}

// ── MODULE: Staff Dashboard ───────────────────────────────────

function renderDashboard() {
  const total     = DB.bookings.length;
  const confirmed = DB.bookings.filter(b => b.status === "confirmed").length;
  const pending   = DB.bookings.filter(b => b.status === "pending").length;
  const checkedIn = DB.bookings.filter(b => b.status === "checked-in").length;
  const revenue   = DB.payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const unpaid    = DB.payments.filter(p => p.status === "unpaid").length;

  el("dash-total").textContent    = total;
  el("dash-confirmed").textContent= confirmed;
  el("dash-pending").textContent  = pending;
  el("dash-checkedin").textContent= checkedIn;
  el("dash-revenue").textContent  = "$" + revenue.toLocaleString();
  el("dash-unpaid").textContent   = unpaid;

  // Recent bookings
  const tbody = el("dash-recent-tbody");
  if (tbody) {
    const recent = [...DB.bookings].slice(-5).reverse();
    tbody.innerHTML = recent.map(b => {
      const guest = DB.guests.find(g => g.id === b.guestId);
      const room  = DB.rooms.find(r => r.id === b.roomId);
      return `<tr>
        <td>#${b.id}</td>
        <td>${guest ? guest.firstName + " " + guest.lastName : "—"}</td>
        <td>${room ? "Room " + room.number : "—"}</td>
        <td>${fmtDate(b.checkIn)}</td>
        <td>${fmtDate(b.checkOut)}</td>
        <td><span class="badge badge-${b.status}">${b.status}</span></td>
      </tr>`;
    }).join("");
  }
}

// ── MODULE: Manage Bookings ───────────────────────────────────

function renderManageBookings() {
  const statusFilter = el("mb-filter-status") ? el("mb-filter-status").value : "";
  let bookings = DB.bookings;
  if (statusFilter) bookings = bookings.filter(b => b.status === statusFilter);

  const tbody = el("mb-tbody");
  if (!tbody) return;

  tbody.innerHTML = bookings.map(b => {
    const guest = DB.guests.find(g => g.id === b.guestId);
    const room  = DB.rooms.find(r => r.id === b.roomId);
    const pay   = DB.payments.find(p => p.bookingId === b.id);
    return `<tr>
      <td>#${b.id}</td>
      <td>${guest ? guest.firstName + " " + guest.lastName : "—"}</td>
      <td>${room ? "Room " + room.number + " — " + room.name : "—"}</td>
      <td>${fmtDate(b.checkIn)}</td>
      <td>${fmtDate(b.checkOut)}</td>
      <td>${b.nights}</td>
      <td><span class="badge badge-${b.status}">${b.status}</span></td>
      <td><span class="badge badge-${pay ? pay.status : "unpaid"}">${pay ? pay.status : "unpaid"}</span></td>
      <td>
        ${b.status === "pending"   ? `<button class="btn btn-sm btn-success" onclick="updateBookingStatus(${b.id},'confirmed')">Confirm</button> ` : ""}
        ${b.status === "confirmed" ? `<button class="btn btn-sm btn-primary" onclick="updateBookingStatus(${b.id},'checked-in')">Check In</button> ` : ""}
        ${b.status !== "cancelled" ? `<button class="btn btn-sm btn-danger"  onclick="updateBookingStatus(${b.id},'cancelled')">Cancel</button>` : ""}
      </td>
    </tr>`;
  }).join("");
}

function updateBookingStatus(bookingId, newStatus) {
  const booking = DB.bookings.find(b => b.id === bookingId);
  if (booking) { booking.status = newStatus; renderManageBookings(); }
}

function filterBookings() { renderManageBookings(); }

// ── MODULE: Manage Guests ─────────────────────────────────────

function renderManageGuests() {
  const search = el("mg-search") ? el("mg-search").value.toLowerCase() : "";
  let guests = DB.guests;
  if (search) guests = guests.filter(g =>
    g.firstName.toLowerCase().includes(search) ||
    g.lastName.toLowerCase().includes(search)  ||
    g.email.toLowerCase().includes(search)
  );

  const tbody = el("mg-tbody");
  if (!tbody) return;

  tbody.innerHTML = guests.map(g => {
    const bookingCount = DB.bookings.filter(b => b.guestId === g.id).length;
    return `<tr>
      <td>#${g.id}</td>
      <td>${g.firstName} ${g.lastName}</td>
      <td>${g.email}</td>
      <td>${g.phone}</td>
      <td>${g.idType}</td>
      <td>${bookingCount}</td>
      <td><button class="btn btn-sm btn-secondary" onclick="viewGuestBookings(${g.id})">View Bookings</button></td>
    </tr>`;
  }).join("");
}

function filterGuests() { renderManageGuests(); }

function viewGuestBookings(guestId) {
  el("mb-filter-status").value = "";
  const bookings = DB.bookings.filter(b => b.guestId === guestId);
  const guest = DB.guests.find(g => g.id === guestId);

  const tbody = el("mb-tbody");
  if (!tbody) { navigate("manage-bookings"); return; }

  navigate("manage-bookings");
  // highlight only this guest
  const tb = el("mb-tbody");
  tb.innerHTML = bookings.map(b => {
    const room = DB.rooms.find(r => r.id === b.roomId);
    const pay  = DB.payments.find(p => p.bookingId === b.id);
    return `<tr>
      <td>#${b.id}</td>
      <td>${guest.firstName} ${guest.lastName}</td>
      <td>${room ? "Room " + room.number + " — " + room.name : "—"}</td>
      <td>${fmtDate(b.checkIn)}</td>
      <td>${fmtDate(b.checkOut)}</td>
      <td>${b.nights}</td>
      <td><span class="badge badge-${b.status}">${b.status}</span></td>
      <td><span class="badge badge-${pay ? pay.status : "unpaid"}">${pay ? pay.status : "unpaid"}</span></td>
      <td></td>
    </tr>`;
  }).join("");
}

// ── MODULE: Manage Payments ───────────────────────────────────

function renderManagePayments() {
  const statusFilter = el("mp-filter-status") ? el("mp-filter-status").value : "";
  let payments = DB.payments;
  if (statusFilter) payments = payments.filter(p => p.status === statusFilter);

  const tbody = el("mp-tbody");
  if (!tbody) return;

  tbody.innerHTML = payments.map(p => {
    const booking = DB.bookings.find(b => b.id === p.bookingId);
    const guest   = booking ? DB.guests.find(g => g.id === booking.guestId) : null;
    return `<tr>
      <td>#${p.id}</td>
      <td>#${p.bookingId}</td>
      <td>${guest ? guest.firstName + " " + guest.lastName : "—"}</td>
      <td>$${p.amount}</td>
      <td>${p.method || "—"}</td>
      <td><span class="badge badge-${p.status}">${p.status}</span></td>
      <td>${p.paidAt ? fmtDate(p.paidAt) : "—"}</td>
      <td>${p.ref || "—"}</td>
      <td>
        ${p.status === "unpaid" || p.status === "partial"
          ? `<button class="btn btn-sm btn-success" onclick="markPaymentPaid(${p.id})">Mark Paid</button>`
          : ""}
      </td>
    </tr>`;
  }).join("");
}

function markPaymentPaid(payId) {
  const payment = DB.payments.find(p => p.id === payId);
  if (payment) {
    payment.status = "paid";
    payment.paidAt = todayISO();
    payment.ref    = payment.ref || ("TXN-" + Math.random().toString(36).substr(2, 6).toUpperCase());
    renderManagePayments();
  }
}

function filterPayments() { renderManagePayments(); }

// ── MODULE: Reports ───────────────────────────────────────────

function renderReports() {
  // Revenue by month (from payments)
  const monthRevenue = {};
  const monthNames   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  DB.payments.filter(p => p.status === "paid").forEach(p => {
    if (!p.paidAt) return;
    const m = p.paidAt.slice(0, 7); // YYYY-MM
    monthRevenue[m] = (monthRevenue[m] || 0) + p.amount;
  });

  const maxRev = Math.max(...Object.values(monthRevenue), 1);
  const revEl  = el("report-revenue-chart");
  if (revEl) {
    revEl.innerHTML = Object.entries(monthRevenue).sort().slice(-6).map(([m, v]) => {
      const pct = Math.round((v / maxRev) * 100);
      const [yr, mo] = m.split("-");
      return `<div class="bar-row">
        <span class="bar-label">${monthNames[parseInt(mo,10)-1]} ${yr}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        <span class="bar-val">$${v}</span>
      </div>`;
    }).join("");
  }

  // Bookings by status
  const statuses = ["confirmed","pending","checked-in","cancelled"];
  const maxBk = Math.max(...statuses.map(s => DB.bookings.filter(b => b.status === s).length), 1);
  const bkEl = el("report-bookings-chart");
  if (bkEl) {
    bkEl.innerHTML = statuses.map(s => {
      const count = DB.bookings.filter(b => b.status === s).length;
      const pct   = Math.round((count / maxBk) * 100);
      const colorMap = { confirmed: "", pending: "orange", "checked-in": "", cancelled: "" };
      return `<div class="bar-row">
        <span class="bar-label">${capitalize(s)}</span>
        <div class="bar-track"><div class="bar-fill ${colorMap[s] || ""}" style="width:${pct}%"></div></div>
        <span class="bar-val">${count}</span>
      </div>`;
    }).join("");
  }

  // Room type demand
  const typeCounts = {};
  DB.bookings.forEach(b => {
    const room = DB.rooms.find(r => r.id === b.roomId);
    if (room) typeCounts[room.type] = (typeCounts[room.type] || 0) + 1;
  });
  const maxType = Math.max(...Object.values(typeCounts), 1);
  const typeEl = el("report-rooms-chart");
  if (typeEl) {
    typeEl.innerHTML = Object.entries(typeCounts).sort((a,b) => b[1]-a[1]).map(([type, count]) => {
      const pct = Math.round((count / maxType) * 100);
      return `<div class="bar-row">
        <span class="bar-label">${capitalize(type)}</span>
        <div class="bar-track"><div class="bar-fill green" style="width:${pct}%"></div></div>
        <span class="bar-val">${count}</span>
      </div>`;
    }).join("");
  }

  // Totals
  const totalRevenue    = DB.payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalBookings   = DB.bookings.length;
  const avgStay         = DB.bookings.length
    ? (DB.bookings.reduce((s, b) => s + b.nights, 0) / DB.bookings.length).toFixed(1)
    : 0;
  const occupancyRate   = Math.round((DB.rooms.filter(r => !r.available).length / DB.rooms.length) * 100);

  el("rpt-total-rev")    && (el("rpt-total-rev").textContent    = "$" + totalRevenue.toLocaleString());
  el("rpt-total-bk")     && (el("rpt-total-bk").textContent     = totalBookings);
  el("rpt-avg-stay")     && (el("rpt-avg-stay").textContent     = avgStay + " nights");
  el("rpt-occupancy")    && (el("rpt-occupancy").textContent    = occupancyRate + "%");
}

// ── Facilities (static) ───────────────────────────────────────
// No rendering needed — facilities section is static HTML

// ── Tabs ──────────────────────────────────────────────────────
function switchTab(groupId, tabId) {
  document.querySelectorAll(`[data-tab-group="${groupId}"]`).forEach(p => p.classList.remove("active"));
  document.querySelectorAll(`[data-tab-btn-group="${groupId}"]`).forEach(b => b.classList.remove("active"));
  const panel = document.querySelector(`[data-tab-group="${groupId}"][data-tab="${tabId}"]`);
  const btn   = document.querySelector(`[data-tab-btn-group="${groupId}"][data-tab-btn="${tabId}"]`);
  if (panel) panel.classList.add("active");
  if (btn)   btn.classList.add("active");
}

// ── Helpers ───────────────────────────────────────────────────

function el(id) { return document.getElementById(id); }

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function nightsBetween(cin, cout) {
  return Math.round((new Date(cout) - new Date(cin)) / 86400000);
}

function fmtDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(d,10)} ${months[parseInt(m,10)-1]} ${y}`;
}

function showAlert(containerId, message, type) {
  const el2 = el(containerId);
  if (!el2) return;
  el2.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  if (type !== "success" && type !== "info") {
    setTimeout(() => { el2.innerHTML = ""; }, 5000);
  }
}

function clearAlert(containerId) {
  const el2 = el(containerId);
  if (el2) el2.innerHTML = "";
}

function formatCardNumber(input) {
  let val = input.value.replace(/\D/g, "").slice(0, 16);
  input.value = val.replace(/(.{4})/g, "$1 ").trim();
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  updateTopNav();
  navigate("login");
});
