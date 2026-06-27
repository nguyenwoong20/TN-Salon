// ===== DATA LOADERS =====

async function loadStylists() {
  const select = document.getElementById("stylistSelect");
  const grid = document.getElementById("stylistGrid");

  try {
    const res = await fetch("/api/stylists");
    const data = await res.json();

    select.innerHTML = '<option value="">Chọn thợ cắt</option>';
    data.forEach((s) => {
      const label = s.nickname ? `${s.name} (${s.nickname})` : s.name || "Thợ";
      select.innerHTML += `<option value="${s.id}">${label}</option>`;
    });

    if (grid) renderStylistGrid(grid, data);
  } catch {
    select.innerHTML = '<option value="">Không tải được danh sách</option>';
    if (grid) grid.innerHTML = '<p class="appt-empty">Không kết nối được server.</p>';
  }
}

function renderStylistGrid(grid, data) {
  if (!data.length) {
    grid.innerHTML = '<p class="appt-empty">Chưa có thông tin thợ.</p>';
    return;
  }
  grid.innerHTML = data.map((s) => {
    const initials = (s.name || "?").split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase();
    const isActive = !s.status || s.status === "ACTIVE";
    return `
      <article class="stylist-card">
        <div class="stylist-avatar">${initials}</div>
        <p class="stylist-name">${s.name || "Chưa có tên"}</p>
        ${s.nickname ? `<p class="stylist-nick">${s.nickname}</p>` : ""}
        ${s.specialty ? `<p class="stylist-specialty">${s.specialty}</p>` : ""}
        <span class="stylist-status">
          <span class="status-dot ${isActive ? "active" : ""}"></span>
          ${isActive ? "Đang hoạt động" : "Tạm nghỉ"}
        </span>
      </article>
    `;
  }).join("");
}

async function loadServices() {
  const select = document.getElementById("serviceSelect");
  const grid = document.getElementById("serviceGrid");

  try {
    const res = await fetch("/api/services");
    const data = await res.json();

    select.innerHTML = '<option value="">Chọn dịch vụ</option>';
    data.forEach((svc) => {
      const price = Number(svc.price || 0).toLocaleString("vi-VN");
      select.innerHTML += `<option value="${svc.id}">${svc.serviceName} — ${price}đ</option>`;
    });

    if (grid) renderServiceGrid(grid, data);
  } catch {
    select.innerHTML = '<option value="">Không tải được dịch vụ</option>';
    if (grid) grid.innerHTML = '<p class="appt-empty">Không kết nối được server.</p>';
  }
}

function renderServiceGrid(grid, data) {
  if (!data.length) {
    grid.innerHTML = '<p class="appt-empty">Chưa có dịch vụ nào.</p>';
    return;
  }
  grid.innerHTML = data.map((svc, i) => {
    const price = Number(svc.price || 0).toLocaleString("vi-VN");
    const duration = Number(svc.duration || 0);
    const featured = i === 0 ? "featured" : "";
    return `
      <article class="service-card ${featured}">
        ${featured ? '<span class="service-pill">Phổ biến nhất</span>' : ""}
        <h3>${svc.serviceName || "Dịch vụ"}</h3>
        <div class="service-meta">
          <span class="service-duration">${duration} phút</span>
          <span class="service-price">${price}đ</span>
        </div>
      </article>
    `;
  }).join("");
}

// ===== BOOKING =====

async function handleBooking(event) {
  event.preventDefault();
  const msg = document.getElementById("bookingMessage");

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const stylistId = document.getElementById("stylistSelect").value;
  const serviceId = document.getElementById("serviceSelect").value;
  const startTime = document.getElementById("startTimeInput").value;
  const notes = document.getElementById("notesInput").value.trim();

  if (!name || !phone || !stylistId || !serviceId || !startTime) {
    showMsg(msg, "fail", "Vui lòng điền đầy đủ thông tin trước khi xác nhận.");
    return;
  }

  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Đang xử lý...";

  try {
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: name,
        customerPhone: phone,
        stylistId: Number(stylistId),
        serviceId: Number(serviceId),
        startTime,
        notes: notes || "Đặt lịch từ website TN-Salon",
      }),
    });

    const body = await res.json();
    if (res.ok) {
      const start = new Date(body.startTime).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
      const end = new Date(body.endTime).toLocaleString("vi-VN", { timeStyle: "short" });
      showMsg(msg, "ok", `Đặt lịch thành công! Hẹn gặp bạn lúc ${start} đến ${end}.`);
      event.target.reset();
    } else {
      showMsg(msg, "fail", body.message || "Đặt lịch thất bại. Vui lòng thử lại.");
    }
  } catch {
    showMsg(msg, "fail", "Không kết nối được server. Vui lòng thử lại.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Xác nhận đặt lịch";
  }
}

// ===== MY APPOINTMENTS =====

async function lookupAppointments() {
  const phone = document.getElementById("lookupPhone").value.trim();
  const list = document.getElementById("appointmentList");

  if (!phone) {
    list.innerHTML = '<p class="appt-empty">Vui lòng nhập số điện thoại.</p>';
    return;
  }

  list.innerHTML = '<p class="appt-empty">Đang tra cứu...</p>';

  try {
    const res = await fetch(`/api/appointments/my?phone=${encodeURIComponent(phone)}`);
    const data = await res.json();

    if (!res.ok) {
      list.innerHTML = `<p class="appt-empty">${data.message || "Không tìm thấy."}</p>`;
      return;
    }

    if (!data.length) {
      list.innerHTML = '<p class="appt-empty">Chưa có lịch hẹn nào với số điện thoại này.</p>';
      return;
    }

    renderAppointments(list, data);
  } catch {
    list.innerHTML = '<p class="appt-empty">Không kết nối được server.</p>';
  }
}

function renderAppointments(container, appointments) {
  const sorted = [...appointments].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  container.innerHTML = sorted.map((appt) => {
    const start = new Date(appt.startTime).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
    const end = appt.endTime
      ? new Date(appt.endTime).toLocaleString("vi-VN", { timeStyle: "short" })
      : null;
    const statusKey = (appt.status || "").toLowerCase();
    const statusLabel = { booked: "Đã đặt", completed: "Hoàn thành", cancelled: "Đã hủy" }[statusKey] || appt.status;

    const isCancellable = statusKey === "booked";

    return `
      <article class="appt-card ${statusKey === "cancelled" ? "cancelled" : ""}" data-id="${appt.id}">
        <div class="appt-main">
          <p class="appt-service">${appt.service?.serviceName || "Dịch vụ"}</p>
          <div class="appt-meta">
            <span class="appt-time">${start}${end ? " — " + end : ""}</span>
            <span>Thợ: ${appt.stylist?.name || "N/A"}</span>
            ${appt.notes ? `<span>${appt.notes}</span>` : ""}
          </div>
          <span class="appt-status status-${statusKey}">${statusLabel}</span>
        </div>
        ${isCancellable
          ? `<button class="btn btn-sm btn-danger" onclick="cancelAppointment(${appt.id}, this)">Hủy lịch</button>`
          : ""}
      </article>
    `;
  }).join("");
}

async function cancelAppointment(id, btn) {
  if (!confirm("Bạn chắc chắn muốn hủy lịch hẹn này?")) return;

  btn.disabled = true;
  btn.textContent = "Đang hủy...";

  try {
    const res = await fetch(`/api/appointments/${id}/cancel`, { method: "PATCH" });
    const body = await res.json();

    if (res.ok) {
      const card = btn.closest(".appt-card");
      card.classList.add("cancelled");
      card.querySelector(".appt-status").textContent = "Đã hủy";
      card.querySelector(".appt-status").className = "appt-status status-cancelled";
      btn.remove();
    } else {
      alert(body.message || "Hủy lịch thất bại.");
      btn.disabled = false;
      btn.textContent = "Hủy lịch";
    }
  } catch {
    alert("Không kết nối được server.");
    btn.disabled = false;
    btn.textContent = "Hủy lịch";
  }
}

// ===== HELPERS =====

function showMsg(el, type, text) {
  el.className = `form-message ${type}`;
  el.textContent = text;
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("show"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("show"); observer.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );
  nodes.forEach((n) => observer.observe(n));
}

function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const drawer = document.getElementById("navDrawer");
  if (!toggle || !drawer) return;

  toggle.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  drawer.querySelectorAll(".drawer-link").forEach((link) => {
    link.addEventListener("click", () => drawer.classList.remove("open"));
  });
}

function setMinDateTime() {
  const input = document.getElementById("startTimeInput");
  if (!input) return;
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  input.min = now.toISOString().slice(0, 16);
}

// ===== INIT =====

document.addEventListener("DOMContentLoaded", () => {
  loadStylists();
  loadServices();
  setupReveal();
  setupMobileNav();
  setMinDateTime();

  document.getElementById("bookingForm").addEventListener("submit", handleBooking);
  document.getElementById("lookupBtn").addEventListener("click", lookupAppointments);

  document.getElementById("lookupPhone").addEventListener("keydown", (e) => {
    if (e.key === "Enter") lookupAppointments();
  });
});
