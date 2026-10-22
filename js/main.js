/**
 * =======================================================================
 * KỊCH BẢN TƯƠNG TÁC WEBSITE CÔ GIÁO VÂN NGUYỄN (vannguyen.life)
 * Tinh Bột Nghệ Nếp & Tinh Dầu Sả Java Mường Tè - Lai Châu
 * =======================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('nav-open');
      const expanded = mainNav.classList.contains('nav-open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('nav-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Interactive Calculator: Tính Liệu Trình Dược Liệu Cá Nhân Hóa
  const calcGoal = document.getElementById('calcGoal');
  const calcPeriod = document.getElementById('calcPeriod');
  const calcResult = document.getElementById('calcResult');
  const calcDosage = document.getElementById('calcDosage');
  const calcRoutine = document.getElementById('calcRoutine');
  const calcDuration = document.getElementById('calcDuration');
  const calcComboRec = document.getElementById('calcComboRec');

  const REGIMEN_DATA = {
    daday: {
      title: 'Hỗ trợ Viêm loét Dạ dày - Đại tràng & Vi khuẩn HP',
      dosage: '2 thìa cà phê (~10g) tinh nghệ nếp + 1-2 thìa mật ong rừng + 150ml nước ấm 45°C.',
      routine: 'Uống vào buổi sáng ngay sau khi thức dậy (trước ăn sáng 30 phút) và trước bữa tối 30 phút.',
      duration: 'Duy trì liên tục từ 6 đến 12 tuần để niêm mạc phục hồi hoàn toàn.',
      combo: 'Combo 1kg Tinh Bột Nghệ Nếp (dùng trong 2-3 tháng) + Tặng 1 chai Tinh dầu Sả Java xông phòng.'
    },
    sausinh: {
      title: 'Phục hồi Toàn diện cho Phụ Nữ Sau Sinh (Hồi xuân & Tan mỡ)',
      dosage: '2 thìa cà phê tinh nghệ nếp pha 150ml nước ấm + 1 thìa sữa đặc (hoặc mật ong).',
      routine: 'Uống sau ăn 30-45 phút, ngày 1-2 lần. Kết hợp trộn sữa chua đắp mặt nạ 2 lần/tuần mờ nám thâm.',
      duration: 'Uống từ tháng đầu sau sinh (sinh thường sau 7 ngày, sinh mổ sau 2-3 tuần) kéo dài 3-6 tháng.',
      combo: 'Combo 1.5kg Nghệ Nếp Mường Tè + 1 Chai Tinh Dầu Sả Java (lau phòng, giữ ấm, đuổi muỗi cho bé).'
    },
    lamdep: {
      title: 'Dưỡng Nhan, Mờ Nám, Liền Sẹo & Căng Bóng Da',
      dosage: 'Uống: 2 thìa tinh nghệ nếp + 150ml nước ấm pha cam tươi hoặc mật ong. Đắp mặt: 2 thìa nghệ + 2 thìa sữa chua không đường.',
      routine: 'Uống mỗi buổi sáng trước ăn. Đắp mặt nạ vào buổi tối 2-3 lần/tuần (thời gian đắp 15-20 phút).',
      duration: 'Cảm nhận làn da sáng khỏe, mờ thâm sau 3-4 tuần kiên trì.',
      combo: 'Hũ 500g Nghệ Nếp Đỏ Siêu Mịn + 1 Tinh Dầu Sả Java 100ml thanh lọc không gian.'
    },
    dekhang: {
      title: 'Tăng Đề Kháng, Thải Độc Gan & Phòng Ngừa Bệnh Mạn Tính',
      dosage: '1.5 thìa cà phê tinh nghệ nếp pha 150ml nước ấm vào mỗi buổi sáng.',
      routine: 'Uống hàng ngày thay thói quen uống trà buổi sáng, giúp gan mật bài tiết độc tố và làm sạch mạch máu.',
      duration: 'Có thể uống duy trì quanh năm như thực phẩm vàng bảo vệ sức khỏe cả gia đình.',
      combo: 'Combo Gia Đình Khỏe Mạnh: 1kg Nghệ Nếp + 2 Chai Tinh Dầu Sả Java 100ml.'
    }
  };

  function updateRegimen() {
    if (!calcGoal || !calcResult) return;
    const selected = calcGoal.value;
    const data = REGIMEN_DATA[selected] || REGIMEN_DATA.daday;

    if (calcDosage) calcDosage.textContent = data.dosage;
    if (calcRoutine) calcRoutine.textContent = data.routine;
    if (calcDuration) calcDuration.textContent = data.duration;
    if (calcComboRec) calcComboRec.textContent = data.combo;
  }

  if (calcGoal) {
    calcGoal.addEventListener('change', updateRegimen);
    updateRegimen(); // Initial load
  }

  // 3. Interactive Order Calculator (Đặt Hàng Nhanh)
  const productSelect = document.getElementById('orderProduct');
  const qtyInput = document.getElementById('orderQty');
  const totalPriceElem = document.getElementById('orderTotalPrice');
  const shippingElem = document.getElementById('orderShipping');
  const orderForm = document.getElementById('quickOrderForm');
  const orderSuccessAlert = document.getElementById('orderSuccessAlert');

  const PRICES = {
    nghe_500g: 280000,
    nghe_1kg: 490000,
    sa_100ml: 120000,
    sa_500ml: 350000,
    combo_giadinh: 590000,
    combo_sausinh: 720000
  };

  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  function recalculateOrder() {
    if (!productSelect || !qtyInput || !totalPriceElem) return;
    const prodKey = productSelect.value;
    const qty = parseInt(qtyInput.value, 10) || 1;
    const unitPrice = PRICES[prodKey] || 490000;
    const subtotal = unitPrice * qty;

    // Freeship for orders over 450,000 VND
    const isFreeShip = subtotal >= 450000;
    if (shippingElem) {
      shippingElem.textContent = isFreeShip ? 'MIỄN PHÍ TOÀN QUỐC (Freeship)' : '30.000đ';
      shippingElem.style.color = isFreeShip ? '#27ae60' : 'inherit';
    }

    const total = subtotal + (isFreeShip ? 0 : 30000);
    totalPriceElem.textContent = formatVND(total);
  }

  if (productSelect && qtyInput) {
    productSelect.addEventListener('change', recalculateOrder);
    qtyInput.addEventListener('input', recalculateOrder);
    recalculateOrder();
  }

  // Handle Order Submit
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('orderName').value.trim();
      const phone = document.getElementById('orderPhone').value.trim();
      const address = document.getElementById('orderAddress').value.trim();
      const note = document.getElementById('orderNote')?.value.trim() || '';
      const prodName = productSelect.options[productSelect.selectedIndex].text;
      const qty = qtyInput.value;
      const total = totalPriceElem.textContent;

      if (!name || !phone || !address) {
        showToast('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!', 'error');
        return;
      }

      // Show success modal/alert
      if (orderSuccessAlert) {
        orderSuccessAlert.style.display = 'block';
        orderSuccessAlert.innerHTML = `
          <div class="order-alert-content">
            <div class="alert-icon">🎉</div>
            <h3>Đặt Hàng Thành Công!</h3>
            <p>Dạ em Vân Nguyễn đã nhận được đơn hàng của <strong>${name}</strong> (${phone}):</p>
            <div class="order-summary-box">
              <p>• <strong>Sản phẩm:</strong> ${prodName} x ${qty}</p>
              <p>• <strong>Tổng thanh toán:</strong> <span class="highlight-price">${total}</span></p>
              <p>• <strong>Địa chỉ nhận:</strong> ${address}</p>
              ${note ? `<p>• <strong>Ghi chú:</strong> ${note}</p>` : ''}
            </div>
            <p class="order-delivery-notice">📦 Đơn hàng sẽ được đóng gói cẩn thận từ Xã Mường Tè, Lai Châu và gửi chuyển phát nhanh tận tay Quý khách. Anh/Chị được mở hàng kiểm tra trước khi thanh toán tiền!</p>
            <div class="order-cta-group">
              <a href="https://zalo.me/0988368125" target="_blank" class="btn btn-zalo">Nhắn Zalo xác nhận ngay</a>
              <button type="button" class="btn btn-secondary" onclick="this.closest('#orderSuccessAlert').style.display='none'">Đóng</button>
            </div>
          </div>
        `;
        orderSuccessAlert.scrollIntoView({ behavior: 'smooth' });
      }

      showToast('Đặt hàng thành công! Cô giáo Vân Nguyễn sẽ gọi điện xác nhận trong 15 phút.', 'success');
      orderForm.reset();
      recalculateOrder();
    });
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Close others
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. Toast Notification System
  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️'}</span>
      <span class="toast-msg">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }
  window.showToast = showToast;

  // 6. Header Scroll Shadow
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('header-scrolled');
    } else {
      siteHeader?.classList.remove('header-scrolled');
    }
  });

  // 7. Video Play/Pause Enhancement
  const videoElem = document.querySelector('.story-video-player');
  if (videoElem) {
    videoElem.addEventListener('mouseenter', () => {
      videoElem.setAttribute('controls', 'true');
    });
  }

  // 8. Auto-track CTA consultation buttons to trigger AI Widget
  document.querySelectorAll('[data-ask-ai]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const question = btn.getAttribute('data-ask-ai');
      if (typeof window.openVanNguyenChat === 'function') {
        window.openVanNguyenChat(question);
      }
    });
  });
});
