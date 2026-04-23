/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Apple, Smartphone, Lock, Star, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { APP_LOGO_URL } from './constants';

// Components
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import SuccessTable from './components/SuccessTable';
import LatestPosts from './components/LatestPosts';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import PaymentNotification from './pages/PaymentNotification';
import Predictions from './pages/Predictions';
import PastSuccess from './pages/PastSuccess';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import PredictionDetail from './pages/PredictionDetail';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import VipPage from './pages/VipPage';
import Biography from './pages/Biography';
import CompliancePage from './pages/CompliancePage';
import LegalPage from './pages/LegalPage';

import Program from './pages/Program';
import FloatingButtons from './components/FloatingButtons';
import HurdaPiyasasi from './pages/HurdaPiyasasi';

// Services & Context
import { dbService } from './services/dbService';
import { useAuth } from './context/AuthContext';

const legalContents: Record<string, {title: string, content: string}> = {
  'kvkk-politikasi-10': {
    title: 'KVKK Politikası',
    content: 'Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında ALTILIYAKALATANADAM.com olarak kişisel verilerinizi nasıl işlediğimiz ve koruduğumuz hakkında detaylı bilgilendirme.\n\nALTILIYAKALATANADAM, kullanıcılarına ait her türlü bilgiyi gizli tutmayı taahhüt eder. Sistemlerimizde barındırılan tüm finansal işlemler, modern şifreleme altyapıları ile korunmaktadır.'
  },
  'gizlilik-ilkesi-6': {
    title: 'Gizlilik İlkesi',
    content: 'Gizlilik İlkesi\n\nALTILIYAKALATANADAM platformu, kullanıcı deneyimini en üst seviyeye taşırken kullanıcı bilgilerinin gizliliğine maksimum düzeyde özen göstermektedir.\n\nSitemizi ziyaret ettiğinizde toplanan veriler yalnızca yasal mevzuatlara uygun bir şekilde istatistiki amaçlarla kullanılmaktadır.'
  },
  'iade-sartlari-7': {
    title: 'İade Şartları',
    content: 'İade Şartları\n\nALTILIYAKALATANADAM.com üzerinden yapılan dijital üyelik paketlerinin ve hizmetlerin iade koşulları.\n\nDijital içerik hizmeti sunulduğu için, satın alınan paketlerin içeriği kullanılmaya başlandığı andan itibaren ücret iadesi yapılmamaktadır. Hizmet başlamadan önce yapılan iptal bildirimleri teknik ekibimizce incelenmektedir.'
  },
  'kullanim-kosullari-8': {
    title: 'Kullanım Koşulları',
    content: 'Kullanım Koşulları\n\nBu web sitesini ziyaret ederek veya ALTILIYAKALATANADAM hizmetlerinden faydalanarak bu koşulları kabul etmiş sayılırsınız.\n\nSite üzerindeki tahminler, analizler ve yorumlar sadece bilgi amaçlı olup kesinlik taşımaz ve yatırımlarınızda %100 başarı garantisi sunmaz.'
  },
  'satis-sozlesmesi-9': {
    title: 'Satış Sözleşmesi',
    content: 'Mesafeli Satış Sözleşmesi\n\nALTILIYAKALATANADAM.com ile kullanıcı arasındaki hizmet ve ürün satış şartları bu sözleşme kapsamında belirlenmiştir.\n\nTarafların hak ve yükümlülükleri, Türk Borçlar Kanunu ve Tüketiciyi Koruma Kanunu uyarınca güvence altındadır.'
  }
};

function LegalPageWrapper() {
  const { slug } = useParams();
  const page = slug ? legalContents[slug] : null;

  if (!page) {
    return <div className="text-white p-20 text-center uppercase font-black italic">Sayfa bulunamadı.</div>;
  }

  return <LegalPage title={page.title} content={page.content} />;
}

const TRACKS = [
  'Diyarbakır',
  'Urfa',
  'Elazığ',
  'Adana',
  'Ankara',
  'İzmir',
  'İstanbul',
  'Kocaeli',
  'Antalya'
];

function HomePage() {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState<any[]>([]);
  const { profile } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<string>('İstanbul');

  useEffect(() => {
    if (profile?.favoriteTracks && profile.favoriteTracks.length > 0) {
      setSelectedTrack(profile.favoriteTracks[0]);
    }
  }, [profile]);

  useEffect(() => {
    const fetchLatest = async () => {
        try {
            const data = await dbService.getPredictions('current', profile?.role || 'user', profile?.isVip || false);
            if (data && Array.isArray(data)) {
                setPredictions(data);
            }
        } catch (err) {
            console.error('Error fetching latest predictions:', err);
        }
    };
    fetchLatest();
  }, []);

  const latestPrediction = predictions.find(p => (p.track || 'İstanbul') === selectedTrack);
  const showContent = latestPrediction?.isPublic || profile?.isVip || profile?.role === 'admin';

  return (
    <>
      <HeroBanner />
      <SuccessTable />
      
      <section id="guncel-tahminler" className="py-24 px-4 overflow-hidden relative border-t border-[#ffcc00]/10 bg-[#010a26]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#000000]/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80" 
            alt="Horse Racing Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10 mb-12 w-full">
           <div className="w-full flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-4 border-b border-white/10 pb-6 mb-8">
              {TRACKS.map(track => {
                 const hasPrediction = predictions.some(p => (p.track || 'İstanbul') === track);
                 return (
                   <button
                     key={track}
                     onClick={() => setSelectedTrack(track)}
                     className={`flex-none px-6 py-3 rounded-full text-[11px] font-medium uppercase tracking-widest transition-all text-center whitespace-nowrap ${
                       selectedTrack === track
                         ? 'bg-white text-black border border-white'
                         : hasPrediction 
                           ? 'bg-transparent text-white border border-white/30 hover:border-white/60'
                           : 'bg-transparent text-gray-600 border border-transparent opacity-50 cursor-pointer hover:text-gray-400'
                     }`}
                   >
                     {track}
                   </button>
                 );
              })}
           </div>
        </div>

        {latestPrediction && (latestPrediction.dailyBanko || latestPrediction.dailySurpriz || latestPrediction.dailyTemplate) && (
          <div className="max-w-7xl mx-auto w-full mb-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPrediction.dailyBanko && (
                <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl transition-all group">
                  <h4 className="text-[10px] font-medium uppercase tracking-widest text-gray-500 mb-4 flex items-center space-x-2">
                    <span>Günün Bankosu</span>
                  </h4>
                  <div className="font-light text-2xl text-white">{latestPrediction.dailyBanko}</div>
                </div>
              )}
              {latestPrediction.dailySurpriz && (
                <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl transition-all group">
                  <h4 className="text-[10px] font-medium uppercase tracking-widest text-gray-500 mb-4 flex items-center space-x-2">
                    <span>Günün Sürprizi</span>
                  </h4>
                  <div className="font-light text-2xl text-white">{latestPrediction.dailySurpriz}</div>
                </div>
              )}
              {latestPrediction.dailyTemplate && (
                <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl transition-all group">
                  <h4 className="text-[10px] font-medium uppercase tracking-widest text-gray-500 mb-4 flex items-center space-x-2">
                    <span>Hazır Şablon</span>
                  </h4>
                  <div className="font-light text-xl text-white tracking-wider">{latestPrediction.dailyTemplate}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {latestPrediction?.isFreeSample && latestPrediction.sampleContent && (
             <div className="max-w-7xl mx-auto w-full mb-16 relative z-10 bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center gap-6">
                <div>
                  <h4 className="text-xl font-light tracking-wide uppercase text-white mb-4">Bugünün Ücretsiz Örneği</h4>
                  <p className="text-gray-400 font-light whitespace-pre-wrap leading-relaxed max-w-3xl mx-auto">{latestPrediction.sampleContent}</p>
                </div>
                {!showContent && (
                  <button onClick={() => navigate('/vip')} className="mt-4 px-8 py-3 bg-white text-black font-medium uppercase tracking-widest text-[11px] rounded-full hover:bg-gray-200 transition-all">
                    Tamamını Gör
                  </button>
                )}
             </div>
        )}

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-12 relative z-10">
          <div className="w-full md:w-5/12 relative flex items-center">
             <div className="text-left w-full pl-0 md:pl-8">
                <img 
                  src={APP_LOGO_URL} 
                  alt="Güncel Tahminler" 
                  className="w-12 h-12 object-contain mb-8 opacity-80"
                  referrerPolicy="no-referrer"
                />
                <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-4">
                  Güncel Analizler
                </h2>
                <div className="w-12 h-[1px] bg-white/20 mb-8"></div>
                <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed mb-12 max-w-md">
                  Alanında uzman yorumcularımız tarafından hazırlanan detaylı istatistikler ve güncel koşu verileri ile kazanma şansınızı artırın.
                </p>
                
                <div className="hidden md:block">
                  <div className="relative group cursor-pointer inline-block mt-4">
                    <div className="absolute inset-0 bg-[#ffcc00] rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
                    <div className="w-56 h-56 rounded-full border-4 border-[#ffcc00]/50 p-2 relative z-10 overflow-hidden shadow-[0_0_40px_rgba(255,204,0,0.3)] bg-[#010a26]">
                       <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                          <img 
                            src="https://cdn.resimupload.org/2026/04/21/e222fecb-3ebb-4f1b-8cdb-b96b4c938aa8.jpg" 
                            alt="Baş Analist" 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 grayscale" 
                            referrerPolicy="no-referrer"
                          />
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          <div className="w-full md:w-7/12 relative z-10 flex flex-col justify-center">
            {latestPrediction ? (
              <div 
                key={latestPrediction.id}
                className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative"
              >
                <div className="absolute top-8 right-8 text-gray-500 font-medium text-[10px] uppercase tracking-widest">
                  {latestPrediction.date || 'BUGÜN'}
                </div>

                <div className="mb-10">
                  <h3 className="text-3xl font-light mb-2">{latestPrediction.track}</h3>
                  <p className="text-gray-500 font-medium text-[11px] uppercase tracking-widest">Günün Başlama Saati: {latestPrediction.startTime || '14:00'}</p>
                </div>

                <div className="relative mb-8 min-h-[300px]">
                  <div className={`transition-all duration-500 ${showContent ? 'blur-0 opacity-100' : 'blur-xl opacity-20 pointer-events-none'}`}>
                     <div className="space-y-6">
                        {latestPrediction.content?.split('\n').map((line: string, i: number) => (
                           <p key={i} className="text-gray-300 leading-relaxed font-light">{line}</p>
                        ))}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                           {latestPrediction.ayaklar && latestPrediction.ayaklar.length > 0 && (
                             <div className="sm:col-span-2 mb-8 w-full overflow-x-auto rounded-[30px] border border-gray-200 relative bg-white custom-scrollbar shadow-2xl text-black">
                               {/* Background Watermark */}
                               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5 overflow-hidden">
                                  <span className="text-black font-black text-6xl md:text-9xl -rotate-12 whitespace-nowrap repeated-watermark break-keep">ALTILI<br/>YAKALATAN<br/>ADAM</span>
                               </div>

                               <div className="relative z-10">
                                 <div className="bg-gray-100 flex flex-col justify-center items-center py-6 border-b border-gray-200">
                                   <div className="flex items-center space-x-3 mb-2">
                                      <img src={APP_LOGO_URL} alt="Logo" className="w-8 h-8 object-contain" />
                                      <span className="text-black font-black tracking-[0.2em] md:tracking-[0.4em] text-lg md:text-2xl uppercase italic">ALTILIYAKALATANADAM</span>
                                   </div>
                                   <div className="flex items-center space-x-2">
                                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                      <span className="text-gray-600 font-black tracking-[0.2em] text-[10px] md:text-xs uppercase">
                                        {latestPrediction.track ? `${latestPrediction.track} ` : ''}VIP KUPON DETAYI
                                      </span>
                                   </div>
                                 </div>
                                 <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-y md:divide-y-0 divide-gray-200 text-center min-w-full md:min-w-[800px]">
                                   {latestPrediction.ayaklar.slice(0, 6).map((a: any, i: number) => {
                                     const horses = typeof a === 'object' ? a.horses : a;
                                     const horseLines = typeof horses === 'string' ? horses.split(/[,/\s-]+/).map(line => line.trim()).filter(Boolean) : [];
                                     const isBanko = typeof a === 'object' ? a.banko : false;
                                     const analysis = typeof a === 'object' ? a.analysis : '';

                                     return (
                                       <div key={i} className={`flex flex-col ${isBanko ? 'bg-yellow-50' : 'bg-white'}`}>
                                         <div className={`text-center py-3 text-xs md:text-sm font-black border-b border-gray-200 ${isBanko ? 'bg-[#ffcc00] text-black' : 'bg-gray-100 text-black'}`}>
                                           {i + 1}. AYAK {isBanko && '(TEK)'}
                                         </div>
                                         <div className="bg-gray-50 text-gray-500 text-center py-1 text-[8px] md:text-[10px] font-black border-b border-gray-200 uppercase tracking-widest">
                                           Numaralar
                                         </div>
                                         <div className="flex flex-col p-4 space-y-3 flex-1">
                                           <div className="flex flex-wrap justify-center gap-2">
                                              {horseLines.map((num, idx) => (
                                                 <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md border-2 bg-green-500 text-white border-green-600`}>
                                                    {num}
                                                 </div>
                                              ))}
                                              {horseLines.length === 0 && (
                                                 <div className="text-gray-400 text-[10px] italic py-2">Belirtilmedi</div>
                                              )}
                                           </div>
                                           {analysis && (
                                              <div className="mt-4 pt-4 border-t border-gray-200 text-[9px] text-gray-600 leading-tight italic font-medium">
                                                 {analysis}
                                              </div>
                                           )}
                                         </div>
                                       </div>
                                     );
                                   })}
                                 </div>
                               </div>
                             </div>
                           )}
                        </div>
                     </div>
                  </div>

                  {!showContent && (
                    <div className="absolute inset-0 flex items-center justify-center p-4 z-20">
                      <div className="bg-[#050505]/95 p-12 rounded-3xl border border-white/10 text-center shadow-2xl backdrop-blur-xl">
                          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6">
                            <Lock size={20} className="text-gray-400" />
                          </div>
                          <h4 className="text-xl font-light mb-4">İçerik Kilitli</h4>
                          <p className="text-gray-500 text-sm mb-8 font-light max-w-[240px]">Analizi tümüyle görüntülemek için VIP üyesi olmalısınız.</p>
                          <button 
                            onClick={(e) => { e.stopPropagation(); navigate('/vip'); }} 
                            className="bg-white text-black px-8 py-3 rounded-full font-medium uppercase text-[11px] tracking-widest hover:bg-gray-200 transition-colors"
                          >
                            VIP Üye Ol
                          </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase font-medium tracking-widest mb-1">Yorumcu</span>
                    <span className="text-lg font-light">{latestPrediction.authorName || 'Uzman Analist'}</span>
                  </div>
                  
                  <button onClick={() => navigate(`/tahmin/${latestPrediction.id}`)} className="mt-4 sm:mt-0 text-white border border-white/20 px-6 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Detaylı İncele
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#0a0a0a] rounded-3xl p-16 border border-white/10 shadow-2xl relative flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-8">
                     <span className="text-gray-600 font-light text-2xl">?</span>
                  </div>
                  <h3 className="text-xl font-light text-gray-400 mb-4">Tahmin Bekleniyor</h3>
                  <p className="text-gray-500 text-sm font-light max-w-sm leading-relaxed">Bu pist ({selectedTrack}) için henüz güncel analiz yüklenmemiştir. Lütfen ilerleyen saatlerde tekrar kontrol edin.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <LatestPosts />
      <Testimonials />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#010a26] text-white selection:bg-[#ffcc00] selection:text-[#010a26]">
        <FloatingButtons />
        <Routes>
          <Route path="/" element={<><Header /><main><HomePage /></main><Footer /></>} />
          <Route path="/kayit-ol" element={<Register />} />
          <Route path="/giris-yap" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/kayit" element={<Register />} />
          <Route path="/odeme-bildirimi" element={<PaymentNotification />} />
          <Route path="/tahminler" element={<Predictions />} />
          <Route path="/basarili-tahminler" element={<PastSuccess />} />
          <Route path="/tahmin/:slug" element={<PredictionDetail />} />
          <Route path="/bilgilerim" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/kimdir" element={<Biography />} />
          <Route path="/vip" element={<VipPage />} />
          <Route path="/program" element={<><Header /><main><Program /></main><Footer /></>} />
          <Route path="/hurda-piyasasi" element={<HurdaPiyasasi />} />
          <Route path="/yasal/:slug" element={<LegalPageWrapper />} />
          <Route path="/kurumsal/:slug" element={<CompliancePage />} />
          <Route path="*" element={<><Header /><main><HomePage /></main><Footer /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
