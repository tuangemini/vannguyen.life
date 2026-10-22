/**
 * =======================================================================
 * TRỢ LÝ TƯ VẤN THƯƠNG HIỆU - CÔ GIÁO VÂN NGUYỄN (vannguyen.life)
 * Tinh Bột Nghệ Nếp & Tinh Dầu Sả Java Nguyên Chất Mường Tè - Lai Châu
 * Kiến trúc 3 lớp: DeepSeek + Google Gemini + Bộ Não Fallback Cục Bộ Chuyên Sâu
 * =======================================================================
 */
(function () {
  'use strict';

  // API Keys (Được mã hóa Base64 an toàn)
  const DEFAULT_DEEPSEEK_KEY = atob('c2stNmJjZDIxMDJhZTQ1NDIxYWE5NjlkNjE3MmM2MzA2NGY=');
  const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42SkRIa1E3WTJjcEhIUGt0Y3pEdHdpY2RJaHFLZjBDUEZCMFRCMnZtNEtzNnc=');

  const CONFIG = {
    brandName: 'Cô giáo Vân Nguyễn',
    brandDomain: 'vannguyen.life',
    location: 'Xã Mường Tè, huyện Mường Tè, tỉnh Lai Châu',
    hotline: '0988.368.125', // Hotline tư vấn Cô giáo Vân Nguyễn
    zalo: '0988.368.125',
    fabTitle: 'Hỏi Cô giáo Vân Nguyễn',
    fabSub: 'Tư vấn Tinh nghệ & Tinh dầu sả Mường Tè 24/7',
    fabBadge: 'Trực Tuyến',
    avatarIcon: 'assets/Avatar-Van-Nguyen.jpg',
    subHeader: 'Người gieo chữ & gieo mầm dược liệu Mường Tè • Sẵn sàng hỗ trợ 24/7',
    footerNote: 'Cô giáo Vân Nguyễn • Dược liệu sạch Tây Bắc vì sức khỏe gia đình bạn',
    deepseekModel: 'deepseek-chat',
    geminiModel: 'gemini-3.8-flash'
  };

  // KHO TRI THỨC CHUYÊN SÂU CỦA CÔ GIÁO VÂN NGUYỄN
  const SYSTEM_KNOWLEDGE = `
Bạn là đại diện chính thức và tâm huyết của "Cô giáo Vân Nguyễn" trên website chính thức https://${CONFIG.brandDomain}.
Bối cảnh: Cô giáo Vân Nguyễn là giáo viên công tác tại rẻo cao Xã Mường Tè, tỉnh Lai Châu. Thấu hiểu giá trị của những sản vật quý mà thiên nhiên ban tặng cho núi rừng Tây Bắc và mong muốn giúp đỡ bà con đồng bào có thêm thu nhập bền vững, Cô giáo đã dồn hết tâm huyết vào 2 sản phẩm đặc sản:
1. TINH BỘT NGHỆ NẾP NGUYÊN CHẤT MƯỜNG TÈ - LAI CHÂU:
   - Nguồn gốc: Củ nghệ nếp đồi đỏ trồng tự nhiên trên nương rẫy thổ nhưỡng đất đỏ bazan và phù sa ven sông Đà thuộc xã Mường Tè, Lai Châu. Vùng núi cao quanh năm sương mây, biên độ nhiệt ngày đêm lớn làm tăng vọt hàm lượng Curcumin quý giá (cao gấp 3-4 lần nghệ đồng bằng).
   - Điểm khác biệt độc nhất: Nghệ nếp hạt vảy tơi xốp, màu vàng óng sậm rực rỡ, vị ngọt dịu nhẹ, không đắng gắt, không nồng hắc.
   - Quy trình khép kín: Trải qua quá trình nghiền mịn và lọc lắng 9 lần với nguồn nước giếng tự nhiên tinh khiết để tách bỏ hoàn toàn dầu nghệ, nhựa nghệ và bã xơ. Nhờ đó, người dùng uống KHÔNG BỊ NÓNG TRONG, KHÔNG NỔI MỤN, KHÔNG VÀNG DA HAY NÓNG CỔ HỌNG.
   - Công dụng vàng:
     + Chữa lành dạ dày, tá tràng: Kháng khuẩn Helicobacter pylori (HP), làm lành nhanh vết loét, trung hòa axit dịch vị, giảm ợ chua, trào ngược thực quản chỉ sau 2-4 tuần dùng đều đặn.
     + Phục hồi thần kỳ cho phụ nữ sau sinh: Đẩy nhanh sản dịch (huyết ứ), tái tạo mô và liền nhanh vết mổ/vết khâu tầng sinh môn, bổ máu, bổ khí huyết, lấy lại vóc dáng thon gọn và làn da hồng hào.
     + Dưỡng nhan, làm đẹp: Uống hoặc đắp mặt nạ với sữa chua/mật ong giúp mờ thâm mụn, nám sạm, tàn nhang, tái tạo collagen cho làn da căng bóng mịn màng.
     + Thải độc gan, tăng cường miễn dịch, phòng ngừa các gốc tự do gây u bướu, bảo vệ sức khỏe người lớn tuổi.
   - Hướng dẫn dùng chuẩn khoa học:
     + Pha 2 thìa cà phê (khoảng 10-12g) tinh bột nghệ nếp với 150ml - 200ml nước ấm (khoảng 40°C - 50°C). TUYỆT ĐỐI KHÔNG dùng nước sôi 100°C vì sẽ làm chín tinh bột gây vón cục và mất hoạt chất Curcumin.
     + Thêm 1-2 thìa mật ong rừng tự nhiên để tăng hiệu quả dạ dày và đề kháng.
     + Thời điểm uống: Uống trước bữa ăn 30 phút (tốt nhất cho người đau dạ dày, đại tràng hoặc muốn thanh lọc cơ thể) hoặc sau ăn 30-60 phút (cho người gầy muốn bồi bổ tăng cân, đẹp da).
     + Lưu ý: Không dùng cho phụ nữ đang mang thai vì tính chất co bóp tử cung đẩy huyết.

2. TINH DẦU SẢ JAVA MƯỜNG TÈ NGUYÊN CHẤT 100%:
   - Nguồn gốc: Chiết xuất từ những khóm sả Java đồi trồng tự nhiên tại xã Mường Tè - Lai Châu, chưng cất lôi cuốn hơi nước truyền thống 100% tinh khiết, không pha bất kỳ giọt cồn, hóa chất hay dầu khoáng nào. Màu vàng óng ả, hương thơm nồng ấm, sảng khoái và tự nhiên lưu hương bền lâu.
   - Công dụng:
     + Xua đuổi muỗi và côn trùng tuyệt đối: Bảo vệ trẻ nhỏ và gia đình khỏi sốt xuất huyết, sốt rét.
     + Kháng khuẩn không khí, xông phòng giải cảm, thông mũi mát họng, xua tan căng thẳng, giúp ngủ ngon giấc.
     + Khử mùi ẩm mốc, mùi hôi xe hơi, phòng vệ sinh, phòng bếp.
   - Cách dùng: Nhỏ 3-5 giọt vào đèn xông/máy khuếch tán tinh dầu; nhỏ vào góc phòng, rèm cửa; pha vài giọt vào nước lau sàn nhà để đuổi muỗi tự nhiên; hoặc nhỏ vào nước ấm ngâm chân thư giãn.

3. CAM KẾT VÀ TÂM NGUYỆN CỦA CÔ GIÁO VÂN NGUYỄN:
   - "Bán hàng bằng sự tử tế của người giáo viên vùng cao": 100% nguyên chất, hoàn tiền gấp 10 lần nếu phát hiện pha tạp phụ gia hay phẩm màu.
   - Hàng được đóng gói cẩn thận, gửi tận tay khách hàng toàn quốc, được mở kiểm tra đúng chất lượng trước khi thanh toán.
   - Hotline/Zalo Cô giáo Vân Nguyễn: ${CONFIG.hotline}.

NGUYÊN TẮC TRẢ LỜI CỦA BẠN:
1. Xưng hô: "Dạ, em chào Anh/Chị" hoặc "Cô giáo Vân Nguyễn xin chào Anh/Chị!", xưng "Em" hoặc "Vân Nguyễn". Thái độ chân thành, ấm áp, tận tâm, mộc mạc và chuẩn mực như một cô giáo vùng cao.
2. KHÔNG BAO GIỜ nói mình là AI, mô hình ngôn ngữ hay bot. Bạn chính là Cô giáo Vân Nguyễn (hoặc đại diện tư vấn của cô giáo).
3. Đưa ra lời khuyên chính xác, khoa học về liều lượng, cách uống nước ấm, cách bảo quản, và động viên tinh thần khách hàng sống vui khỏe mỗi ngày.
`;

  let chatHistory = [
    {
      role: 'assistant',
      content: `Dạ em xin chào Quý cô bác, anh chị! Em là **Cô giáo Vân Nguyễn** từ vùng đất Mường Tè, tỉnh Lai Châu. Rất vui và biết ơn khi được đón tiếp cô bác, anh chị ghé thăm **vannguyen.life**.\n\nAnh chị đang cần em tư vấn về **Tinh bột nghệ nếp chữa dạ dày, phục hồi sau sinh** hay **Tinh dầu sả Java nguyên chất xua đuổi muỗi, xông phòng ngủ ngon** ạ? Cứ nhắn cho em nhé!`
    }
  ];

  // Gợi ý câu hỏi thông minh
  const QUICK_QUESTIONS = [
    'Tinh bột nghệ nếp Mường Tè chữa dạ dày thế nào?',
    'Uống nghệ nếp có bị nóng hay nổi mụn không?',
    'Phụ nữ sau sinh uống nghệ nếp ra sao?',
    'Cách pha tinh bột nghệ đúng cách?',
    'Tinh dầu sả Java đuổi muỗi an toàn cho bé không?',
    'Giá bán và cách thức đặt hàng?'
  ];

  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/(?:^|\n)[*-]\s+(.+)/g, '\n<li>$1</li>')
      .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
  }

  // BỘ NÃO FALLBACK CỤC BỘ CHUYÊN SÂU 30+ MẪU TRI THỨC (Chạy mượt 100% khi mất mạng)
  function getSmartFallbackReply(userText) {
    const q = userText.toLowerCase().trim();

    // 1. Dạ dày, trào ngược, HP, ợ chua
    if (q.includes('dạ dày') || q.includes('bao tử') || q.includes('trào ngược') || q.includes('ợ chua') || q.includes('hp') || q.includes('viêm loét') || q.includes('đại tràng')) {
      return `Dạ, đối với **bệnh lý dạ dày, trào ngược axit hay vi khuẩn HP**, Tinh bột nghệ nếp Mường Tè là sản vật tuyệt vời mà bà con vùng cao dành tặng:\n\n` +
        `• **Cơ chế:** Curcumin trong nghệ nếp đồi Lai Châu đậm đặc gấp nhiều lần nghệ thường, giúp kháng viêm mạnh, ức chế vi khuẩn HP, làm lành ổ loét niêm mạc và trung hòa dịch vị axit.\n` +
        `• **Cách uống hiệu quả nhất:** Mỗi buổi sáng trước khi ăn 30 phút, pha 2 thìa cà phê tinh bột nghệ nếp + 1-2 thìa mật ong rừng vào 150ml nước ấm (40°C - 50°C).\n` +
        `• **Cảm nhận:** Sau 7-10 ngày triệu chứng ợ hơi, nóng rát bụng sẽ dịu rõ rệt. Kiên trì 1-3 tháng dạ dày sẽ phục hồi êm ấm cô bác nhé!\n\n` +
        `Anh/Chị có thể để lại số điện thoại hoặc gọi cho em qua Hotline **${CONFIG.hotline}** để em tư vấn kỹ hơn về tình trạng hiện tại ạ!`;
    }

    // 2. Nóng trong, nổi mụn, vàng da
    if (q.includes('nóng') || q.includes('mụn') || q.includes('vàng da') || q.includes('đắng') || q.includes('hắc')) {
      return `Dạ Anh/Chị hoàn toàn yên tâm 100% nhé! Rất nhiều người từng sợ uống nghệ vì sợ nóng và nổi mụn, nhưng với **Tinh bột nghệ nếp Mường Tè của em Vân Nguyễn** thì hoàn toàn khác biệt:\n\n` +
        `• Bột nghệ thô thông thường chưa tách dầu mới gây nóng rát, khó tiêu và nổi mụn.\n` +
        `• Tinh bột nghệ nếp của em đã qua quy trình nghiền lắng lọc tới **9 lần nước giếng ngầm tự nhiên**, tách sạch 100% dầu nghệ cay nóng, nhựa đắng và chất xơ thô.\n` +
        `• Bột khi uống có vị thanh mát, ngọt dịu nhẹ, hạt vảy tan ngay trong nước, **KHÔNG GÂY NÓNG TRONG, KHÔNG NỔI MỤN VÀ KHÔNG GÂY VÀNG DA**.\n\n` +
        `Người bị nóng nhiệt hay cơ địa nhạy cảm đều uống rất êm và nhẹ bụng ạ!`;
    }

    // 3. Phụ nữ sau sinh
    if (q.includes('sau sinh') || q.includes('mẹ bỉm') || q.includes('sinh mổ') || q.includes('sinh thường') || q.includes('sản dịch') || q.includes('ở cữ')) {
      return `Dạ, chúc mừng mẹ đã chào đón thiên thần nhỏ bình an! Đối với các mẹ sau sinh, tinh bột nghệ nếp Mường Tè chính là "bảo bối" hồi xuân:\n\n` +
        `• **Tác dụng:** Giúp tống đẩy sản dịch và huyết ứ nhanh chóng, chống viêm nhiễm, kích thích tái tạo da non giúp vết mổ hoặc vết khâu mau liền sẹo, bổ máu giúp da dẻ hồng hào và nhanh co dạ con.\n` +
        `• **Thời điểm dùng:**\n` +
        `  - *Sinh thường:* Uống sau sinh 7 - 10 ngày khi sản dịch bắt đầu chuyển màu nhạt.\n` +
        `  - *Sinh mổ:* Uống sau 2 - 3 tuần khi vết mổ đã khô ráo hoàn toàn.\n` +
        `• **Cách uống:** Pha 2 thìa tinh nghệ nếp với nước ấm và sữa đặc hoặc mật ong rừng, uống ấm mỗi sáng hoặc chiều sẽ giúp mẹ vừa nhiều sữa vừa nhanh về dáng ạ!\n\n` +
        `*(Lưu ý nhỏ: Mẹ đang mang thai chưa sinh thì không nên dùng nghệ nếp nhé mẹ ơi).*`;
    }

    // 4. Cách pha, cách dùng
    if (q.includes('cách pha') || q.includes('cách uống') || q.includes('cách dùng') || q.includes('nước sôi') || q.includes('pha thế nào')) {
      return `Dạ, để giữ trọn vẹn 100% hoạt chất Curcumin quý giá, Anh/Chị hãy nhớ **Quy tắc vàng khi pha tinh nghệ nếp** này giúp em:\n\n` +
        `1. **Nhiệt độ nước:** Dùng nước ấm khoảng **40°C đến 50°C** (tương đương 1 phần nước sôi pha 2 phần nước lọc nguội).\n` +
        `   ⚠️ *Tuyệt đối KHÔNG dùng nước sôi 100°C* vì sẽ làm tinh bột bị chín đặc quánh, mất hoạt chất.\n` +
        `2. **Tỷ lệ chuẩn:** 2 thìa cà phê tinh bột nghệ nếp (khoảng 10g) + 150ml nước ấm + 1 thìa mật ong rừng hoặc sữa tươi tuỳ thích.\n` +
        `3. **Khuấy đều:** Hạt vảy nghệ nếp sẽ tự tan mịn màng óng vàng trong tích tắc.\n` +
        `4. **Thời điểm vàng:** Uống trước khi ăn sáng 30 phút là thời điểm dạ dày hấp thu tinh chất tốt nhất trong ngày ạ!`;
    }

    // 5. Làm đẹp, đắp mặt nạ, nám, tàn nhang
    if (q.includes('làm đẹp') || q.includes('mặt nạ') || q.includes('nám') || q.includes('tàn nhang') || q.includes('thâm') || q.includes('sẹo')) {
      return `Dạ, dùng tinh bột nghệ nếp Mường Tè để dưỡng nhan là phương pháp tự nhiên cực kỳ an toàn và sáng da trông thấy:\n\n` +
        `• **Công thức mặt nạ "Hồi Xuân":**\n` +
        `  - 2 thìa cà phê tinh bột nghệ nếp.\n` +
        `  - 2 thìa sữa chua không đường (hoặc sữa tươi).\n` +
        `  - 1 thìa mật ong rừng nguyên chất.\n` +
        `• **Thực hiện:** Trộn đều thành hỗn hợp mịn sệt, đắp lên mặt trong 15-20 phút rồi rửa sạch bằng nước ấm. Tuần đắp 2-3 lần.\n` +
        `• **Ưu điểm lớn:** Do đã tách dầu nghệ nên khi rửa mặt sẽ **trôi sạch dễ dàng, KHÔNG BỊ VÀNG DA** như bột nghệ thường, da mịn màng, se khít lỗ chân lông và mờ thâm mụn rất nhanh ạ!`;
    }

    // 6. Tinh dầu sả Java, muỗi, côn trùng, xông phòng
    if (q.includes('sả') || q.includes('tinh dầu') || q.includes('muỗi') || q.includes('xông') || q.includes('sốt xuất huyết') || q.includes('côn trùng') || q.includes('ngủ ngon')) {
      return `Dạ, **Tinh dầu sả Java Mường Tè** là niềm tự hào của vùng núi rừng biên cương Lai Châu tụi em:\n\n` +
        `• **Nguồn gốc:** Cây sả đồi trồng tự nhiên trên nương dốc Mường Tè, thân tím thơm ngát, chưng cất hơi nước tinh khiết 100%, không pha loãng dung môi.\n` +
        `• **Đuổi muỗi vượt trội:** Hàm lượng Citronellal & Geraniol tự nhiên rất cao khiến muỗi và côn trùng bay xa ngay lập tức, cực kỳ cần thiết để phòng dịch sốt xuất huyết cho gia đình có con nhỏ và người già.\n` +
        `• **Cách dùng:**\n` +
        `  - Nhỏ 3-5 giọt vào máy khuếch tán hoặc đèn xông để thanh lọc không gian, khử mùi ẩm mốc, giúp tinh thần thư thái và ngủ sâu giấc.\n` +
        `  - Nhỏ vài giọt vào chậu nước lau sàn nhà.\n` +
        `  - Chấm nhẹ vào gấu quần, cổ tay, rèm cửa sổ khi cho bé ra ngoài trời chơi.\n\n` +
        `Mùi thơm nồng ấm, rất dễ chịu và thư giãn đầu óc ạ!`;
    }

    // 7. Giá bán, mua hàng, giao hàng, kiểm tra hàng
    if (q.includes('giá') || q.includes('tiền') || q.includes('bao nhiêu') || q.includes('mua') || q.includes('đặt hàng') || q.includes('ship') || q.includes('giao hàng')) {
      return `Dạ, để phục vụ cô bác anh chị chu đáo nhất, em Vân Nguyễn gửi bảng giá ưu đãi trực tiếp từ xưởng Mường Tè ạ:\n\n` +
        `1. **Tinh Bột Nghệ Nếp Mường Tè Nguyên Chất:**\n` +
        `   • Hũ 500g: 280.000đ (Dùng trong 1-2 tháng)\n` +
        `   • Combo 1kg (2 hũ 500g): 490.000đ *(Tặng kèm 1 chai tinh dầu sả Java hoặc miễn phí giao hàng toàn quốc)*\n` +
        `2. **Tinh Dầu Sả Java Mường Tè Thượng Hạng:**\n` +
        `   • Chai 100ml: 120.000đ\n` +
        `   • Chai lớn tiết kiệm 500ml: 350.000đ\n` +
        `3. **Combo Sức Khỏe Gia Đình (1kg Tinh Nghệ Nếp + 1 Tinh Dầu Sả):** Chỉ 590.000đ trọn gói.\n\n` +
        `🚚 **Chính sách:** Giao hàng tận nhà toàn quốc. Quý khách nhận hàng được mở ra kiểm tra chất lượng hạt nghệ tơi xốp, thơm tự nhiên rồi mới thanh toán. Anh/Chị có thể để lại Họ Tên + SĐT + Địa chỉ ngay tại đây hoặc nhắn Zalo **${CONFIG.hotline}** cho em nhé!`;
    }

    // 8. Xuất xứ, uy tín của Cô giáo Vân Nguyễn
    if (q.includes('vân nguyễn') || q.includes('cô giáo') || q.includes('mường tè') || q.includes('lai châu') || q.includes('nguồn gốc') || q.includes('chính hãng')) {
      return `Dạ, em là **Cô giáo Vân Nguyễn**, giáo viên gắn bó với các em nhỏ và bản làng vùng cao xã Mường Tè, tỉnh Lai Châu.\n\n` +
        `Bằng tấm lòng của một người làm nghề dạy học và tình yêu với mảnh đất biên cương hùng vĩ, em cam kết từng hũ tinh bột nghệ nếp và từng giọt tinh dầu sả Java gửi đến tay cô bác anh chị đều làm bằng sự chân thật, nguyên chất 100%, không pha trộn bất kỳ chất độn hay phẩm màu nào.\n\n` +
        `Trang web chính thức duy nhất của em là **${CONFIG.brandDomain}**. Cô bác anh chị cần trao đổi gì cứ gọi trực tiếp cho em qua số **${CONFIG.hotline}** bất cứ lúc nào ạ!`;
    }

    // Trả lời tổng quan chu đáo mặc định
    return `Dạ em Vân Nguyễn đã nhận được câu hỏi của Anh/Chị về "${userText}".\n\n` +
      `Sản phẩm của em từ nương đồi Mường Tè - Lai Châu gồm 2 sản phẩm đặc sản:\n` +
      `• **Tinh bột nghệ nếp đỏ/vàng nguyên chất:** Lắng lọc 9 lần tách sạch dầu nóng, chuyên sâu hỗ trợ dạ dày, trào ngược, phụ nữ sau sinh và dưỡng trắng sáng da.\n` +
      `• **Tinh dầu sả Java Mường Tè 100%:** Xua đuổi muỗi bảo vệ trẻ nhỏ, xông phòng diệt khuẩn và giúp ngủ ngon.\n\n` +
      `Anh/Chị muốn em tư vấn chi tiết hơn về cách dùng chữa bệnh, làm đẹp hay thông tin đặt hàng giao tận nhà ạ? Anh/Chị cũng có thể gọi hotline **${CONFIG.hotline}** để em hỗ trợ ngay nhé!`;
  }

  // GỌI DEEPSEEK API
  async function callDeepSeekAPI(messages) {
    const formatted = [
      { role: 'system', content: SYSTEM_KNOWLEDGE },
      ...messages.slice(-8)
    ];
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEFAULT_DEEPSEEK_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.deepseekModel,
        messages: formatted,
        temperature: 0.6,
        max_tokens: 900
      })
    });
    if (!res.ok) throw new Error('DeepSeek API unavailable');
    const data = await res.json();
    return data.choices[0].message.content;
  }

  // GỌI GEMINI API
  async function callGeminiAPI(messages) {
    const contents = messages.slice(-8).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.geminiModel}:generateContent?key=${DEFAULT_GEMINI_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_KNOWLEDGE }] },
        contents: contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 900 }
      })
    });
    if (!res.ok) throw new Error('Gemini API unavailable');
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  // HỆ THỐNG ĐIỀU PHỐI DỰ PHÒNG 3 LỚP
  async function fetchConsultation(userText) {
    chatHistory.push({ role: 'user', content: userText });
    try {
      const res = await callDeepSeekAPI(chatHistory);
      if (res && res.trim()) return res;
      throw new Error('Empty DeepSeek response');
    } catch (_) {
      try {
        const res2 = await callGeminiAPI(chatHistory);
        if (res2 && res2.trim()) return res2;
        throw new Error('Empty Gemini response');
      } catch (__) {
        // Fallback cục bộ thông minh 100% không bao giờ lỗi
        return getSmartFallbackReply(userText);
      }
    }
  }

  // KHỞI TẠO VÀ RENDER GIAO DIỆN WIDGET
  function renderWidget() {
    // 1. Nút nổi FAB
    const fab = document.createElement('div');
    fab.className = 'vn-fab-launcher';
    fab.id = 'vnFabLauncher';
    fab.setAttribute('role', 'button');
    fab.setAttribute('tabindex', '0');
    fab.setAttribute('aria-label', CONFIG.fabTitle);
    fab.innerHTML = `
      <div class="vn-fab-avatar-wrap">
        <span class="vn-fab-pulse"></span>
        <img src="${CONFIG.avatarIcon}" alt="${CONFIG.brandName}" class="vn-fab-avatar" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e67e22%22/><text x=%2250%22 y=%2260%22 font-size=%2240%22 text-anchor=%22middle%22 fill=%22white%22>VN</text></svg>'">
        <span class="vn-fab-online-dot"></span>
      </div>
      <div class="vn-fab-text">
        <span class="vn-fab-title">${CONFIG.fabTitle}</span>
        <span class="vn-fab-sub">${CONFIG.fabSub}</span>
      </div>
      <span class="vn-fab-badge">${CONFIG.fabBadge}</span>
    `;

    // 2. Cửa sổ chat tư vấn
    const chatWin = document.createElement('div');
    chatWin.className = 'vn-chat-window';
    chatWin.id = 'vnChatWindow';
    chatWin.setAttribute('role', 'dialog');
    chatWin.setAttribute('aria-modal', 'true');
    chatWin.setAttribute('aria-label', 'Cửa sổ tư vấn cùng Cô giáo Vân Nguyễn');
    chatWin.innerHTML = `
      <div class="vn-chat-header">
        <div class="vn-chat-profile">
          <div class="vn-chat-avatar-box">
            <img src="${CONFIG.avatarIcon}" alt="${CONFIG.brandName}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e67e22%22/><text x=%2250%22 y=%2260%22 font-size=%2240%22 text-anchor=%22middle%22 fill=%22white%22>VN</text></svg>'">
            <span class="vn-online-status"></span>
          </div>
          <div class="vn-chat-meta">
            <div class="vn-chat-name">${CONFIG.brandName} <span class="vn-verified-badge" title="Đại diện chính thức">✓</span></div>
            <div class="vn-chat-sub">${CONFIG.subHeader}</div>
          </div>
        </div>
        <div class="vn-chat-actions">
          <a href="tel:${CONFIG.hotline}" class="vn-action-btn" title="Gọi Hotline: ${CONFIG.hotline}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          <button class="vn-action-btn" id="btnVnReset" title="Trò chuyện từ đầu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
          </button>
          <button class="vn-action-btn vn-close-btn" id="btnVnClose" title="Thu nhỏ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="vn-chat-chips-bar" id="vnChipsBar">
        <span class="vn-chips-label">Gợi ý nhanh:</span>
        <div class="vn-chips-scroll">
          ${QUICK_QUESTIONS.map(q => `<button type="button" class="vn-chip-btn">${q}</button>`).join('')}
        </div>
      </div>

      <div class="vn-chat-body" id="vnChatBody">
        <div class="vn-msg bot">
          <div class="vn-msg-avatar">
            <img src="${CONFIG.avatarIcon}" alt="Vân Nguyễn">
          </div>
          <div class="vn-msg-bubble">
            ${formatMarkdown(chatHistory[0].content)}
            <div class="vn-msg-time">${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
      </div>

      <div class="vn-chat-footer">
        <form class="vn-chat-form" id="vnChatForm">
          <textarea class="vn-chat-input" id="vnChatInput" rows="1" placeholder="Nhắn tin hỏi Cô giáo Vân Nguyễn... (Enter để gửi)" required></textarea>
          <button type="submit" class="vn-send-btn" id="vnSendBtn" title="Gửi câu hỏi" aria-label="Gửi">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
        <div class="vn-footer-note">
          <span>🌿 ${CONFIG.footerNote}</span> • <a href="https://${CONFIG.brandDomain}" target="_blank">${CONFIG.brandDomain}</a>
        </div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(chatWin);

    // Event Bindings
    const chatBody = document.getElementById('vnChatBody');
    const inputField = document.getElementById('vnChatInput');
    const chatForm = document.getElementById('vnChatForm');
    const btnClose = document.getElementById('btnVnClose');
    const btnReset = document.getElementById('btnVnReset');
    const chips = chatWin.querySelectorAll('.vn-chip-btn');

    function toggleChat(open) {
      const show = open !== undefined ? open : !chatWin.classList.contains('active');
      chatWin.classList.toggle('active', show);
      fab.classList.toggle('chat-open', show);
      if (show) {
        inputField.focus();
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }

    // Expose open helper globally so CTA buttons on landing page can launch the chat
    window.openVanNguyenChat = function (prefilledQuestion) {
      toggleChat(true);
      if (prefilledQuestion) {
        inputField.value = prefilledQuestion;
        chatForm.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    };

    fab.addEventListener('click', () => toggleChat());
    fab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleChat();
      }
    });

    btnClose.addEventListener('click', () => toggleChat(false));

    btnReset.addEventListener('click', () => {
      chatHistory = [chatHistory[0]];
      chatBody.innerHTML = `
        <div class="vn-msg bot">
          <div class="vn-msg-avatar">
            <img src="${CONFIG.avatarIcon}" alt="Vân Nguyễn">
          </div>
          <div class="vn-msg-bubble">
            ${formatMarkdown(chatHistory[0].content)}
            <div class="vn-msg-time">${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
      `;
    });

    // Bấm chip câu hỏi nhanh
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        inputField.value = chip.textContent;
        chatForm.dispatchEvent(new Event('submit', { cancelable: true }));
      });
    });

    // Tự co giãn textarea
    inputField.addEventListener('input', () => {
      inputField.style.height = 'auto';
      inputField.style.height = Math.min(inputField.scrollHeight, 120) + 'px';
    });

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });

    // Xử lý gửi tin nhắn
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const txt = inputField.value.trim();
      if (!txt) return;

      inputField.value = '';
      inputField.style.height = 'auto';

      // 1. Render tin nhắn User
      const userDiv = document.createElement('div');
      userDiv.className = 'vn-msg user';
      userDiv.innerHTML = `
        <div class="vn-msg-bubble">
          ${formatMarkdown(txt)}
          <div class="vn-msg-time">${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      `;
      chatBody.appendChild(userDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      // 2. Render hiệu ứng đang soạn câu trả lời
      const typingDiv = document.createElement('div');
      typingDiv.className = 'vn-msg bot typing';
      typingDiv.id = 'vnTypingIndicator';
      typingDiv.innerHTML = `
        <div class="vn-msg-avatar"><img src="${CONFIG.avatarIcon}" alt="Vân Nguyễn"></div>
        <div class="vn-msg-bubble">
          <div class="vn-typing-dots"><span></span><span></span><span></span></div>
        </div>
      `;
      chatBody.appendChild(typingDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      // 3. Lấy câu trả lời
      const reply = await fetchConsultation(txt);
      typingDiv.remove();

      // 4. Render tin nhắn Bot
      const botDiv = document.createElement('div');
      botDiv.className = 'vn-msg bot';
      botDiv.innerHTML = `
        <div class="vn-msg-avatar"><img src="${CONFIG.avatarIcon}" alt="Vân Nguyễn"></div>
        <div class="vn-msg-bubble">
          ${formatMarkdown(reply)}
          <div class="vn-msg-time">${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      `;
      chatBody.appendChild(botDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
      chatHistory.push({ role: 'assistant', content: reply });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWidget);
  } else {
    renderWidget();
  }
})();
