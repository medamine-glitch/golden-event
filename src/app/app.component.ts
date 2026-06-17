import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Supplement { id: string; name: string; description: string; price: number; selected: boolean; icon: string; }
interface ColorSwatch { name: string; hex: string; }
interface TestimonialQuote { name: string; location: string; event: string; quote: string; }
interface FaqItem { id: string; q: string; a: string; }
interface Theme {
  id: string; tab: string; name: string; subtitle: string;
  description: string; longDescription: string;
  accentHex: string; gradientFrom: string; gradientTo: string;
  basePrice: number; badge?: string;
  highlights: string[]; whatIsIncluded: string[];
  palette: ColorSwatch[]; testimonialQuotes: TestimonialQuote[];
}
interface BookingData { fullName: string; phone: string; eventDate: string; eventHour: string; baseTheme: string; notes: string; }
type ViewType = 'home' | 'detail' | 'customizer';
type BackdropTier = 'standard' | 'double' | 'trio';
type TableTier = 'none' | 'single' | 'trio';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="min-h-screen font-sans" style="background:#FDFBF7;color:#1A1A1A;">

<!-- ══════════════════════════════════════════════════
     NAVIGATION
══════════════════════════════════════════════════ -->
<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-nav" style="background:rgba(253,251,247,0.88);border-bottom:1px solid rgba(212,175,55,0.15);">
  <div class="max-w-7xl mx-auto px-5 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <button (click)="goTo('home')" class="text-left flex-shrink-0 group">
        <div class="font-display italic text-xl leading-none transition-colors group-hover:opacity-80" style="color:#D4AF37;">Golden Event</div>
        <div class="text-[9px] tracking-[0.28em] uppercase mt-0.5" style="color:rgba(26,26,26,0.38);">by Khaoula</div>
      </button>
      <div class="hidden md:flex items-center gap-6">
        <button (click)="goTo('home')" class="text-xs font-semibold tracking-[0.1em] uppercase transition-colors hover:opacity-100" [style]="currentView()==='home' ? 'color:#D4AF37;' : 'color:rgba(26,26,26,0.5);'">Home</button>
        <button (click)="goTo('home')" class="text-xs font-semibold tracking-[0.1em] uppercase transition-colors hover:opacity-100" style="color:rgba(26,26,26,0.5);">Collection</button>
        <button (click)="goTo('customizer')" class="text-xs font-semibold tracking-[0.1em] uppercase transition-colors hover:opacity-100" [style]="currentView()==='customizer' ? 'color:#D4AF37;' : 'color:rgba(26,26,26,0.5);'">Configurer</button>
        <a href="https://wa.me/212719455509" target="_blank" rel="noopener"
           class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-wide text-white transition-all hover:-translate-y-px hover:shadow-gold-md"
           style="background:#D4AF37;">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path [attr.d]="waPath"/></svg>
          Réserver
        </a>
      </div>
      <button class="md:hidden p-2" (click)="mobileMenuOpen.set(!mobileMenuOpen())" aria-label="Menu">
        @if (!mobileMenuOpen()) {
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        } @else {
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        }
      </button>
    </div>
  </div>
  @if (mobileMenuOpen()) {
    <div class="md:hidden px-5 py-4 border-t space-y-1" style="background:rgba(253,251,247,0.97);border-color:rgba(212,175,55,0.12);">
      <button (click)="goTo('home');mobileMenuOpen.set(false)" class="block w-full text-left px-3 py-2.5 text-sm rounded-xl" style="color:rgba(26,26,26,0.7);">Accueil</button>
      <button (click)="goTo('customizer');mobileMenuOpen.set(false)" class="block w-full text-left px-3 py-2.5 text-sm rounded-xl" style="color:rgba(26,26,26,0.7);">Configurer</button>
      <a href="https://wa.me/212719455509" target="_blank" class="mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white" style="background:#D4AF37;">WhatsApp</a>
    </div>
  }
</nav>

<!-- ══════════════════════════════════════════════════
     HOME VIEW
══════════════════════════════════════════════════ -->
@if (currentView() === 'home') {
<div class="view-enter">

  <!-- HERO: ASYMMETRIC EDITORIAL SPLIT -->
  <section id="home" class="relative min-h-screen overflow-hidden pt-16">
    <div class="max-w-7xl mx-auto px-5 lg:px-8 min-h-screen flex items-center">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 w-full py-20 lg:py-0 items-center">

        <!-- LEFT: Editorial Typography -->
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8" style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.25);">
            <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#D4AF37;"></div>
            <span class="text-[10px] font-bold tracking-[0.28em] uppercase" style="color:#D4AF37;">Événements Premium · Meknès</span>
          </div>

          <h1 class="font-display italic leading-[1.06] mb-6" style="font-size:clamp(3rem,6vw,5.5rem);color:#1A1A1A;">
            Chaque instant<br>
            mérite d'être<br>
            <span style="color:#D4AF37;">inoubliable.</span>
          </h1>

          <p class="text-base md:text-lg leading-relaxed mb-10 max-w-md" style="color:rgba(26,26,26,0.52);">
            Décorations élégantes, arches sur mesure et thèmes uniques — chaque détail imaginé pour transformer votre célébration en souvenir éternel.
          </p>

          <div class="flex flex-wrap gap-4 mb-14">
            <button (click)="scrollHome('catalog')"
                    class="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-gold-lg"
                    style="background:#D4AF37;">
              Explorer la Collection
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
            <button (click)="goTo('customizer')"
                    class="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                    style="border:1.5px solid rgba(212,175,55,0.45);color:#D4AF37;background:transparent;">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
              Créer Mon Thème
            </button>
          </div>

          <!-- Stats bar -->
          <div class="flex flex-wrap gap-10">
            @for (stat of stats; track stat.label) {
              <div>
                <div class="font-display italic text-3xl font-semibold" style="color:#D4AF37;">{{ stat.value }}</div>
                <div class="text-[10px] tracking-[0.2em] uppercase mt-0.5" style="color:rgba(26,26,26,0.38);">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>

        <!-- RIGHT: CSS Arch Art Composition -->
        <div class="hidden lg:flex items-center justify-center relative" style="height:580px;">
          <!-- Soft ambient glow -->
          <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 55% 45%, rgba(212,175,55,0.1) 0%, transparent 68%);"></div>

          <!-- Outer arch frame -->
          <div class="absolute" style="width:300px;height:360px;border:1.5px solid rgba(212,175,55,0.28);border-top:none;border-radius:0 0 150px 150px;top:60px;left:50%;transform:translateX(-50%);"></div>
          <!-- Middle arch -->
          <div class="absolute" style="width:224px;height:280px;border:1px solid rgba(212,175,55,0.18);border-top:none;border-radius:0 0 112px 112px;top:100px;left:50%;transform:translateX(-50%);"></div>
          <!-- Inner arch -->
          <div class="absolute" style="width:152px;height:196px;border:1px solid rgba(212,175,55,0.13);border-top:none;border-radius:0 0 76px 76px;top:140px;left:50%;transform:translateX(-50%);"></div>

          <!-- Brand lettering inside arch -->
          <div class="absolute text-center" style="top:50%;left:50%;transform:translate(-50%,-58%);z-index:2;">
            <div class="font-display italic leading-none" style="font-size:3rem;color:rgba(212,175,55,0.45);">Golden</div>
            <div class="font-display italic leading-none" style="font-size:3rem;color:rgba(212,175,55,0.45);">Event</div>
            <div class="text-[9px] tracking-[0.32em] uppercase mt-2" style="color:rgba(212,175,55,0.3);">by Khaoula</div>
          </div>

          <!-- Floating balloon shapes -->
          <div class="absolute animate-float" style="width:44px;height:52px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:rgba(255,182,193,0.55);top:130px;left:90px;"></div>
          <div class="absolute animate-float" style="width:36px;height:44px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:rgba(212,175,55,0.45);top:110px;right:88px;animation-delay:0.6s;"></div>
          <div class="absolute animate-float" style="width:28px;height:34px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:rgba(173,216,230,0.6);top:188px;left:72px;animation-delay:1.1s;"></div>
          <div class="absolute animate-float" style="width:22px;height:28px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:rgba(255,218,185,0.7);top:170px;right:76px;animation-delay:0.3s;"></div>

          <!-- Sparkle dots -->
          <div class="absolute w-2 h-2 rounded-full animate-pulse" style="background:#D4AF37;opacity:0.7;top:88px;left:168px;"></div>
          <div class="absolute w-1.5 h-1.5 rounded-full animate-pulse" style="background:#D4AF37;opacity:0.5;top:72px;right:162px;animation-delay:0.4s;"></div>
          <div class="absolute w-1 h-1 rounded-full" style="background:#D4AF37;opacity:0.6;top:230px;left:108px;"></div>
          <div class="absolute w-1 h-1 rounded-full" style="background:#D4AF37;opacity:0.4;top:220px;right:100px;"></div>

          <!-- Floor / Stage line -->
          <div class="absolute" style="bottom:95px;left:50%;transform:translateX(-50%);width:260px;height:1.5px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.35),transparent);"></div>
          <!-- Plinth cylinders -->
          <div class="absolute rounded-t-sm" style="bottom:76px;left:calc(50% - 72px);width:22px;height:20px;background:rgba(212,175,55,0.18);border:1px solid rgba(212,175,55,0.25);"></div>
          <div class="absolute rounded-t-sm" style="bottom:76px;left:calc(50% + 50px);width:22px;height:20px;background:rgba(212,175,55,0.18);border:1px solid rgba(212,175,55,0.25);"></div>

          <!-- Corner decorative lines (asymmetric editorial feel) -->
          <div class="absolute top-12 right-12 w-12 h-12 pointer-events-none" style="border-top:1.5px solid rgba(212,175,55,0.3);border-right:1.5px solid rgba(212,175,55,0.3);"></div>
          <div class="absolute bottom-12 left-12 w-12 h-12 pointer-events-none" style="border-bottom:1.5px solid rgba(212,175,55,0.3);border-left:1.5px solid rgba(212,175,55,0.3);"></div>
        </div>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none" style="opacity:0.3;">
      <div class="text-[9px] tracking-[0.3em] uppercase" style="color:#1A1A1A;">Défiler</div>
      <div class="w-px h-10 animate-pulse" style="background:linear-gradient(to bottom,#D4AF37,transparent);"></div>
    </div>
  </section>

  <!-- ═══ EDITORIAL CATALOG ═══ -->
  <section id="catalog" class="py-24 px-5" style="background:#FDFBF7;">
    <div class="max-w-7xl mx-auto">

      <!-- Header row: left label + right tab pills (editorial asymmetry) -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style="color:#D4AF37;">Notre Collection</div>
          <h2 class="font-display italic" style="font-size:clamp(2.2rem,4vw,3.5rem);color:#1A1A1A;line-height:1.1;">Thèmes sur mesure<br>pour chaque instant</h2>
        </div>
        <div class="flex flex-wrap gap-2">
          @for (tab of tabs; track tab.id) {
            <button (click)="switchTab(tab.id)"
                    class="rounded-full px-5 py-2 text-xs font-bold tracking-wide uppercase transition-all hover:-translate-y-px"
                    [style]="activeTab()===tab.id ? 'background:#D4AF37;color:white;box-shadow:0 4px 14px rgba(212,175,55,0.3);' : 'background:white;color:rgba(26,26,26,0.55);border:1px solid rgba(212,175,55,0.2);'">
              {{ tab.label }}
            </button>
          }
        </div>
      </div>

      <!-- Asymmetric editorial grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        @for (theme of filteredThemes(); track theme.id; let i = $index) {
          <div
            class="card-trace rounded-3xl overflow-hidden cursor-pointer flex flex-col"
            [class]="i === 0 ? 'md:col-span-2 md:row-span-2' : ''"
            [class.selected]="selectedThemeId() === theme.id"
            [style]="selectedThemeId()===theme.id ? 'background:white;border:2px solid #D4AF37;' : 'background:rgba(255,255,255,0.75);border:1px solid rgba(212,175,55,0.14);'"
            (click)="selectTheme(theme.id)"
          >
            <!-- Visual panel -->
            <div class="relative overflow-hidden flex items-end"
                 [style]="'background:linear-gradient(140deg,' + theme.gradientFrom + ',' + theme.gradientTo + ');height:' + (i===0 ? '320px' : '180px') + ';'">
              @if (theme.badge) {
                <div class="absolute top-4 right-4 rounded-full px-3 py-1 text-[9px] font-black tracking-widest uppercase text-white z-10" style="background:#D4AF37;">{{ theme.badge }}</div>
              }
              @if (selectedThemeId() === theme.id) {
                <div class="absolute top-4 left-4 w-7 h-7 rounded-full flex items-center justify-center z-10" style="background:#D4AF37;">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
              }
              <!-- Arch decorative rings inside card -->
              <div class="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                   [style]="'width:' + (i===0?'200px':'130px') + ';height:' + (i===0?'160px':'100px') + ';border:1.5px solid ' + theme.accentHex + ';border-top:none;opacity:0.22;border-radius:0 0 ' + (i===0?'100px':'65px') + ' ' + (i===0?'100px':'65px') + ';'"></div>

              <!-- If first card, show themed floating balloons -->
              @if (i === 0) {
                <div class="absolute animate-float" [style]="'width:36px;height:44px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:' + theme.accentHex + ';opacity:0.5;top:60px;left:60px;'"></div>
                <div class="absolute animate-float" [style]="'width:28px;height:34px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:' + theme.accentHex + ';opacity:0.35;top:80px;right:80px;animation-delay:0.7s;'"></div>
              }

              <div class="relative z-10 w-full px-5 pb-4 flex items-end justify-between">
                <div class="flex gap-1.5">
                  @for (sw of theme.palette; track sw.name) {
                    <div class="rounded-full ring-2 ring-white shadow" [style]="'width:' + (i===0?'28px':'22px') + ';height:' + (i===0?'28px':'22px') + ';background:' + sw.hex + ';'" [title]="sw.name"></div>
                  }
                </div>
                <div class="rounded-full px-3 py-1 text-xs font-bold" style="background:rgba(253,251,247,0.92);color:#1A1A1A;">{{ theme.basePrice }} MAD</div>
              </div>
            </div>

            <!-- Card body -->
            <div class="flex flex-col flex-1 p-6">
              <div class="text-[9px] tracking-[0.25em] uppercase mb-1" style="color:rgba(26,26,26,0.35);">{{ theme.subtitle }}</div>
              <h3 [class]="'font-display italic mb-2 leading-snug ' + (i===0 ? 'text-2xl' : 'text-lg')" style="color:#1A1A1A;">{{ theme.name }}</h3>
              <p class="text-sm leading-relaxed mb-4" [class]="i===0 ? '' : 'line-clamp-2'" style="color:rgba(26,26,26,0.52);">{{ theme.description }}</p>

              @if (i === 0) {
                <div class="space-y-2 mb-5 flex-1">
                  @for (feat of theme.highlights.slice(0,4); track feat) {
                    <div class="flex items-center gap-2.5 text-xs" style="color:rgba(26,26,26,0.6);">
                      <svg class="w-3.5 h-3.5 flex-shrink-0" style="color:#D4AF37;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {{ feat }}
                    </div>
                  }
                </div>
              }

              <div class="flex gap-3 mt-auto pt-4">
                <button (click)="$event.stopPropagation();openDetail(theme.id)"
                        class="flex-1 rounded-2xl py-2.5 text-xs font-bold tracking-wide uppercase transition-all hover:-translate-y-px"
                        style="border:1.5px solid rgba(212,175,55,0.35);color:#D4AF37;background:transparent;">
                  Voir Détails
                </button>
                <button (click)="$event.stopPropagation();selectTheme(theme.id);goTo('customizer')"
                        class="flex-1 rounded-2xl py-2.5 text-xs font-bold tracking-wide uppercase text-white transition-all hover:-translate-y-px hover:shadow-gold-md"
                        style="background:#D4AF37;">
                  {{ selectedThemeId()===theme.id ? '✓ Configurer' : 'Choisir' }}
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </section>

  <!-- ═══ TESTIMONIALS CAROUSEL ═══ -->
  <section id="reviews" class="py-24 px-5" style="background:#1A1A1A;">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-14">
        <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style="color:rgba(212,175,55,0.6);">Témoignages</div>
        <h2 class="font-display italic text-4xl md:text-5xl" style="color:#FDFBF7;">Ce que disent nos clientes</h2>
      </div>

      <!-- Carousel card -->
      <div class="relative max-w-3xl mx-auto">
        @for (t of testimonials; track $index) {
          @if (testimonialIndex() === $index) {
            <div class="animate-testimonial rounded-3xl p-10 md:p-14 text-center" style="background:rgba(255,255,255,0.04);border:1px solid rgba(212,175,55,0.18);">
              <!-- Stars -->
              <div class="flex justify-center gap-1.5 mb-8">
                @for (s of [1,2,3,4,5]; track s) {
                  <svg class="w-4 h-4" style="color:#D4AF37;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                }
              </div>
              <!-- Quote mark -->
              <div class="font-display italic text-6xl leading-none mb-4" style="color:rgba(212,175,55,0.2);">"</div>
              <p class="font-display italic text-xl md:text-2xl leading-relaxed mb-8" style="color:rgba(253,251,247,0.88);">{{ t.quote }}</p>
              <div class="w-10 h-px mx-auto mb-6" style="background:rgba(212,175,55,0.4);"></div>
              <div class="text-sm font-semibold" style="color:#D4AF37;">{{ t.name }}</div>
              <div class="text-xs mt-1" style="color:rgba(253,251,247,0.4);">{{ t.location }} · {{ t.event }}</div>
            </div>
          }
        }

        <!-- Navigation -->
        <div class="flex items-center justify-center gap-6 mt-10">
          <button (click)="prevTestimonial()"
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-px"
                  style="border:1px solid rgba(212,175,55,0.3);color:rgba(212,175,55,0.7);">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div class="flex gap-2">
            @for (t of testimonials; track $index) {
              <button (click)="testimonialIndex.set($index)"
                      class="rounded-full transition-all"
                      [style]="testimonialIndex()===$index ? 'width:24px;height:6px;background:#D4AF37;' : 'width:6px;height:6px;background:rgba(212,175,55,0.25);'">
              </button>
            }
          </div>
          <button (click)="nextTestimonial()"
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-px"
                  style="border:1px solid rgba(212,175,55,0.3);color:rgba(212,175,55,0.7);">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ FAQ SECTION ═══ -->
  <section id="faq" class="py-24 px-5" style="background:#FDFBF7;">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

        <!-- Left heading (2 cols) -->
        <div class="lg:col-span-2 lg:sticky lg:top-28">
          <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style="color:#D4AF37;">FAQ</div>
          <h2 class="font-display italic text-4xl md:text-5xl leading-[1.08] mb-6" style="color:#1A1A1A;">Questions fréquentes</h2>
          <p class="text-sm leading-relaxed mb-8" style="color:rgba(26,26,26,0.5);">Besoin d'informations supplémentaires? Contactez-nous directement sur WhatsApp.</p>
          <a href="https://wa.me/212719455509" target="_blank" rel="noopener"
             class="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold text-white transition-all hover:-translate-y-px hover:shadow-gold-md"
             style="background:#D4AF37;">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path [attr.d]="waPath"/></svg>
            Nous contacter
          </a>
        </div>

        <!-- Right accordion (3 cols) -->
        <div class="lg:col-span-3 space-y-3">
          @for (faq of faqs; track faq.id) {
            <div class="rounded-2xl overflow-hidden" style="border:1px solid rgba(212,175,55,0.18);">
              <button class="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gold/5 group"
                      (click)="toggleFaq(faq.id)">
                <span class="text-sm font-semibold pr-4 transition-colors" [style]="faqOpenId()===faq.id ? 'color:#D4AF37;' : 'color:#1A1A1A;'">{{ faq.q }}</span>
                <svg class="w-4 h-4 flex-shrink-0 transition-transform duration-300" [style]="faqOpenId()===faq.id ? 'color:#D4AF37;transform:rotate(45deg);' : 'color:rgba(26,26,26,0.4);'"
                     fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
              <div class="faq-body" [class.open]="faqOpenId()===faq.id">
                <div class="px-6 pb-5 text-sm leading-relaxed" style="color:rgba(26,26,26,0.6);">{{ faq.a }}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <ng-container *ngTemplateOutlet="footerTpl"></ng-container>
</div>
} <!-- /home view -->


<!-- ══════════════════════════════════════════════════
     PACKAGE DETAIL VIEW
══════════════════════════════════════════════════ -->
@if (currentView() === 'detail') {
<div class="view-enter pt-16">

  <!-- Back button bar -->
  <div class="px-5 py-4" style="border-bottom:1px solid rgba(212,175,55,0.12);">
    <div class="max-w-7xl mx-auto">
      <button (click)="goTo('home')" class="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase transition-colors hover:opacity-100" style="color:rgba(26,26,26,0.45);">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Retour à la collection
      </button>
    </div>
  </div>

  <!-- Detail Hero — CSS Collage Grid -->
  <section class="px-5 py-16">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">

        <!-- Panel 1: Main arch hero (spans 2 rows) -->
        <div class="lg:row-span-2 rounded-3xl relative overflow-hidden flex items-end" style="min-height:400px;"
             [style.background]="'linear-gradient(140deg,' + selectedTheme().gradientFrom + ',' + selectedTheme().gradientTo + ')'">
          @if (selectedTheme().badge) {
            <div class="absolute top-5 right-5 rounded-full px-3 py-1 text-[9px] font-black tracking-widest uppercase text-white" style="background:#D4AF37;">{{ selectedTheme().badge }}</div>
          }
          <!-- Large arch art -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style="width:220px;height:280px;border:2px solid rgba(255,255,255,0.35);border-top:none;border-radius:0 0 110px 110px;"></div>
          <div class="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style="width:150px;height:196px;border:1.5px solid rgba(255,255,255,0.2);border-top:none;border-radius:0 0 75px 75px;"></div>
          <!-- Themed balloons -->
          <div class="absolute animate-float" [style]="'width:48px;height:58px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:' + selectedTheme().accentHex + ';opacity:0.55;top:80px;left:52px;'"></div>
          <div class="absolute animate-float" [style]="'width:36px;height:44px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:' + selectedTheme().accentHex + ';opacity:0.38;top:60px;right:48px;animation-delay:0.8s;'"></div>
          <!-- Floor label -->
          <div class="relative z-10 w-full p-7">
            <div class="text-[9px] tracking-[0.25em] uppercase mb-1" style="color:rgba(255,255,255,0.6);">{{ selectedTheme().subtitle }}</div>
            <h1 class="font-display italic text-3xl leading-snug" style="color:white;">{{ selectedTheme().name }}</h1>
          </div>
        </div>

        <!-- Panel 2: Color palette card -->
        <div class="rounded-3xl p-7 flex flex-col justify-between" style="background:rgba(255,255,255,0.8);border:1px solid rgba(212,175,55,0.18);min-height:190px;">
          <div class="text-[9px] tracking-[0.25em] uppercase mb-4" style="color:rgba(26,26,26,0.35);">Palette chromatique</div>
          <div class="flex flex-wrap gap-4">
            @for (sw of selectedTheme().palette; track sw.name) {
              <div class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 rounded-2xl shadow-md ring-2 ring-white" [style]="'background:' + sw.hex + ';'"></div>
                <div class="text-[9px] tracking-wide" style="color:rgba(26,26,26,0.45);">{{ sw.name }}</div>
              </div>
            }
          </div>
        </div>

        <!-- Panel 3: Price + CTA card -->
        <div class="rounded-3xl p-7 flex flex-col justify-between" style="background:rgba(212,175,55,0.06);border:1.5px solid rgba(212,175,55,0.25);min-height:190px;">
          <div>
            <div class="text-[9px] tracking-[0.25em] uppercase mb-2" style="color:rgba(26,26,26,0.35);">À partir de</div>
            <div class="font-display italic text-4xl" style="color:#D4AF37;">{{ selectedTheme().basePrice }} <span class="text-2xl">MAD</span></div>
          </div>
          <button (click)="goTo('customizer')"
                  class="mt-6 w-full rounded-2xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-gold-lg"
                  style="background:#D4AF37;">
            Configurer ce thème →
          </button>
        </div>
      </div>

      <!-- Long description -->
      <div class="max-w-3xl mb-16">
        <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style="color:#D4AF37;">À propos de ce thème</div>
        <p class="text-base leading-loose" style="color:rgba(26,26,26,0.65);">{{ selectedTheme().longDescription }}</p>
      </div>

      <!-- What's Included -->
      <div class="mb-16">
        <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-8" style="color:#D4AF37;">Ce qui est inclus</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          @for (item of selectedTheme().whatIsIncluded; track item) {
            <div class="flex items-start gap-4 p-5 rounded-2xl" style="background:rgba(255,255,255,0.75);border:1px solid rgba(212,175,55,0.14);">
              <svg class="w-5 h-5 flex-shrink-0 mt-px" style="color:#D4AF37;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="text-sm leading-relaxed" style="color:rgba(26,26,26,0.7);">{{ item }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Package Testimonials -->
      <div>
        <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-8" style="color:#D4AF37;">Ce que disent nos clientes</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          @for (t of selectedTheme().testimonialQuotes; track t.name) {
            <div class="rounded-3xl p-7" style="background:rgba(255,255,255,0.75);border:1px solid rgba(212,175,55,0.16);">
              <div class="flex gap-1 mb-4">
                @for (s of [1,2,3,4,5]; track s) {
                  <svg class="w-3.5 h-3.5" style="color:#D4AF37;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                }
              </div>
              <p class="text-sm leading-relaxed mb-5 italic" style="color:rgba(26,26,26,0.65);">"{{ t.quote }}"</p>
              <div class="text-xs font-bold" style="color:#1A1A1A;">{{ t.name }}</div>
              <div class="text-[10px] mt-0.5" style="color:rgba(26,26,26,0.4);">{{ t.location }} · {{ t.event }}</div>
            </div>
          }
        </div>
      </div>
    </div>
  </section>

  <!-- Sticky bottom CTA bar -->
  <div class="sticky bottom-0 z-40 px-5 py-4" style="background:rgba(253,251,247,0.95);border-top:1px solid rgba(212,175,55,0.2);backdrop-filter:blur(16px);">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <div>
        <div class="font-display italic text-xl" style="color:#1A1A1A;">{{ selectedTheme().name }}</div>
        <div class="text-xs" style="color:rgba(26,26,26,0.4);">À partir de <span class="font-bold" style="color:#D4AF37;">{{ selectedTheme().basePrice }} MAD</span></div>
      </div>
      <button (click)="goTo('customizer')"
              class="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-gold-lg"
              style="background:#D4AF37;">
        Configurer & Réserver
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </button>
    </div>
  </div>

  <ng-container *ngTemplateOutlet="footerTpl"></ng-container>
</div>
} <!-- /detail view -->


<!-- ══════════════════════════════════════════════════
     CUSTOMIZER VIEW
══════════════════════════════════════════════════ -->
@if (currentView() === 'customizer') {
<div class="view-enter pt-16">

  <!-- Step breadcrumb -->
  <div class="px-5 py-5" style="border-bottom:1px solid rgba(212,175,55,0.12);background:rgba(253,251,247,0.9);">
    <div class="max-w-7xl mx-auto flex items-center gap-2">
      <button (click)="goTo('home')" class="text-xs font-semibold tracking-wide uppercase transition-colors hover:opacity-80" style="color:rgba(26,26,26,0.4);">Collection</button>
      <svg class="w-3 h-3" style="color:rgba(26,26,26,0.25);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
      <span class="text-xs font-bold tracking-wide uppercase" style="color:#D4AF37;">Configurer</span>
      <svg class="w-3 h-3" style="color:rgba(26,26,26,0.25);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
      <span class="text-xs font-semibold tracking-wide uppercase" style="color:rgba(26,26,26,0.35);">Réserver</span>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-5 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

      <!-- LEFT: Main configurator content (2 cols) -->
      <div class="lg:col-span-2 space-y-12">

        <!-- Base theme selector strip -->
        <div>
          <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-5" style="color:#D4AF37;">1 · Choisir le thème de base</div>
          <div class="flex flex-wrap gap-2 mb-3">
            @for (tab of tabs; track tab.id) {
              <button (click)="switchTab(tab.id)"
                      class="rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase transition-all"
                      [style]="activeTab()===tab.id ? 'background:#D4AF37;color:white;' : 'background:white;color:rgba(26,26,26,0.5);border:1px solid rgba(212,175,55,0.2);'">
                {{ tab.label }}
              </button>
            }
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            @for (theme of filteredThemes(); track theme.id) {
              <div class="card-trace rounded-2xl p-4 cursor-pointer"
                   [class.selected]="selectedThemeId()===theme.id"
                   [style]="selectedThemeId()===theme.id ? 'background:rgba(212,175,55,0.07);border:2px solid #D4AF37;' : 'background:white;border:1px solid rgba(212,175,55,0.16);'"
                   (click)="selectTheme(theme.id)">
                <div class="h-20 rounded-xl mb-3 relative overflow-hidden flex items-end"
                     [style]="'background:linear-gradient(140deg,' + theme.gradientFrom + ',' + theme.gradientTo + ');'">
                  @if (selectedThemeId()===theme.id) {
                    <div class="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style="background:#D4AF37;">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                  }
                  <div class="absolute top-0 left-1/2 -translate-x-1/2" style="width:70px;height:52px;border:1.5px solid rgba(255,255,255,0.3);border-top:none;border-radius:0 0 35px 35px;"></div>
                </div>
                <div class="text-xs font-bold leading-snug" style="color:#1A1A1A;">{{ theme.name }}</div>
                <div class="text-[10px] mt-1 font-semibold" style="color:#D4AF37;">{{ theme.basePrice }} MAD</div>
              </div>
            }
          </div>
        </div>

        <!-- ── BACKDROP SELECTOR ── -->
        <div>
          <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-2" style="color:#D4AF37;">2 · Configuration des arches</div>
          <p class="text-xs mb-6" style="color:rgba(26,26,26,0.45);">Choisissez le nombre d'arches décoratifs pour votre installation.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <!-- Standard: 1 arch -->
            <div class="supp-card rounded-2xl p-5 cursor-pointer text-center"
                 [class.selected]="backdropTier()==='standard'"
                 [style]="backdropTier()==='standard' ? 'background:rgba(212,175,55,0.07);border:2px solid #D4AF37;' : 'background:white;border:1px solid rgba(212,175,55,0.16);'"
                 (click)="backdropTier.set('standard')">
              <div class="h-20 flex items-end justify-center pb-2 mb-4">
                <div class="relative">
                  <div style="width:56px;height:48px;border:2.5px solid #D4AF37;border-top:none;border-radius:0 0 28px 28px;opacity:0.7;"></div>
                  <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-px" style="background:rgba(212,175,55,0.3);"></div>
                </div>
              </div>
              <div class="text-xs font-bold mb-1" style="color:#1A1A1A;">1 Arche</div>
              <div class="text-[10px]" style="color:rgba(26,26,26,0.4);">Standard — Inclus</div>
              <div class="mt-2 text-xs font-semibold" style="color:rgba(26,26,26,0.35);">+0 MAD</div>
            </div>

            <!-- Double: 2 arches -->
            <div class="supp-card rounded-2xl p-5 cursor-pointer text-center"
                 [class.selected]="backdropTier()==='double'"
                 [style]="backdropTier()==='double' ? 'background:rgba(212,175,55,0.07);border:2px solid #D4AF37;' : 'background:white;border:1px solid rgba(212,175,55,0.16);'"
                 (click)="backdropTier.set('double')">
              <div class="h-20 flex items-end justify-center pb-2 mb-4">
                <div class="flex items-end gap-2">
                  <div style="width:44px;height:44px;border:2.5px solid #D4AF37;border-top:none;border-radius:0 0 22px 22px;opacity:0.7;"></div>
                  <div style="width:44px;height:44px;border:2.5px solid #D4AF37;border-top:none;border-radius:0 0 22px 22px;opacity:0.7;"></div>
                </div>
              </div>
              <div class="text-xs font-bold mb-1" style="color:#1A1A1A;">2 Arches</div>
              <div class="text-[10px]" style="color:rgba(26,26,26,0.4);">Double installation</div>
              <div class="mt-2 text-xs font-bold" style="color:#D4AF37;">+300 MAD</div>
            </div>

            <!-- Trio overlap: 3 arches -->
            <div class="supp-card rounded-2xl p-5 cursor-pointer text-center"
                 [class.selected]="backdropTier()==='trio'"
                 [style]="backdropTier()==='trio' ? 'background:rgba(212,175,55,0.07);border:2px solid #D4AF37;' : 'background:white;border:1px solid rgba(212,175,55,0.16);'"
                 (click)="backdropTier.set('trio')">
              <div class="h-20 flex items-end justify-center pb-2 mb-4 relative">
                <div class="absolute" style="width:38px;height:40px;border:2.5px solid #D4AF37;border-top:none;border-radius:0 0 19px 19px;opacity:0.4;left:20px;"></div>
                <div class="relative z-10" style="width:48px;height:48px;border:2.5px solid #D4AF37;border-top:none;border-radius:0 0 24px 24px;opacity:0.85;"></div>
                <div class="absolute" style="width:38px;height:40px;border:2.5px solid #D4AF37;border-top:none;border-radius:0 0 19px 19px;opacity:0.4;right:20px;"></div>
              </div>
              <div class="text-xs font-bold mb-1" style="color:#1A1A1A;">Trio Duo-Arch</div>
              <div class="text-[10px]" style="color:rgba(26,26,26,0.4);">3 arches chevauchés</div>
              <div class="mt-2 text-xs font-bold" style="color:#D4AF37;">+550 MAD</div>
            </div>
          </div>
        </div>

        <!-- ── TABLE & PLINTH SELECTOR ── -->
        <div>
          <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-2" style="color:#D4AF37;">3 · Tables & Présentoirs</div>
          <p class="text-xs mb-6" style="color:rgba(26,26,26,0.45);">Choisissez la configuration de tables assorties à votre thème.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <!-- None -->
            <div class="supp-card rounded-2xl p-5 cursor-pointer text-center"
                 [class.selected]="tableTier()==='none'"
                 [style]="tableTier()==='none' ? 'background:rgba(212,175,55,0.07);border:2px solid #D4AF37;' : 'background:white;border:1px solid rgba(212,175,55,0.16);'"
                 (click)="tableTier.set('none')">
              <div class="h-20 flex items-center justify-center mb-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center" style="border:2px dashed rgba(212,175,55,0.3);">
                  <svg class="w-5 h-5" style="color:rgba(212,175,55,0.4);" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </div>
              </div>
              <div class="text-xs font-bold mb-1" style="color:#1A1A1A;">Sans table</div>
              <div class="text-[10px]" style="color:rgba(26,26,26,0.4);">Configuration standard</div>
              <div class="mt-2 text-xs font-semibold" style="color:rgba(26,26,26,0.35);">+0 MAD</div>
            </div>

            <!-- Single cylinder table -->
            <div class="supp-card rounded-2xl p-5 cursor-pointer text-center"
                 [class.selected]="tableTier()==='single'"
                 [style]="tableTier()==='single' ? 'background:rgba(212,175,55,0.07);border:2px solid #D4AF37;' : 'background:white;border:1px solid rgba(212,175,55,0.16);'"
                 (click)="tableTier.set('single')">
              <div class="h-20 flex items-end justify-center pb-2 mb-4">
                <div class="flex flex-col items-center">
                  <!-- Cylinder top (ellipse) -->
                  <div style="width:32px;height:10px;background:rgba(212,175,55,0.55);border-radius:50%;margin-bottom:-1px;"></div>
                  <!-- Cylinder body -->
                  <div style="width:28px;height:38px;background:rgba(212,175,55,0.18);border:2px solid rgba(212,175,55,0.55);border-radius:0 0 4px 4px;"></div>
                </div>
              </div>
              <div class="text-xs font-bold mb-1" style="color:#1A1A1A;">Table Solo</div>
              <div class="text-[10px]" style="color:rgba(26,26,26,0.4);">Présentoir cylindrique</div>
              <div class="mt-2 text-xs font-bold" style="color:#D4AF37;">+250 MAD</div>
            </div>

            <!-- Trio tables (staggered heights) -->
            <div class="supp-card rounded-2xl p-5 cursor-pointer text-center"
                 [class.selected]="tableTier()==='trio'"
                 [style]="tableTier()==='trio' ? 'background:rgba(212,175,55,0.07);border:2px solid #D4AF37;' : 'background:white;border:1px solid rgba(212,175,55,0.16);'"
                 (click)="tableTier.set('trio')">
              <div class="h-20 flex items-end justify-center gap-1.5 pb-2 mb-4">
                @for (h of tableTrios; track h) {
                  <div class="flex flex-col items-center">
                    <div [style]="'width:22px;height:8px;background:rgba(212,175,55,0.55);border-radius:50%;margin-bottom:-1px;'"></div>
                    <div [style]="'width:18px;height:' + h + 'px;background:rgba(212,175,55,0.18);border:1.5px solid rgba(212,175,55,0.55);border-radius:0 0 3px 3px;'"></div>
                  </div>
                }
              </div>
              <div class="text-xs font-bold mb-1" style="color:#1A1A1A;">Trio Étagé</div>
              <div class="text-[10px]" style="color:rgba(26,26,26,0.4);">3 présentoirs assortis</div>
              <div class="mt-2 text-xs font-bold" style="color:#D4AF37;">+450 MAD</div>
            </div>
          </div>
        </div>

        <!-- ── PREMIUM ADD-ONS ── -->
        <div>
          <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-2" style="color:#D4AF37;">4 · Ajouts Premium</div>
          <p class="text-xs mb-6" style="color:rgba(26,26,26,0.45);">Sélectionnez des éléments supplémentaires pour sublimer votre événement.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            @for (supp of supplements(); track supp.id) {
              <div class="supp-card rounded-2xl p-5 cursor-pointer"
                   [class.selected]="supp.selected"
                   [style]="supp.selected ? 'background:rgba(212,175,55,0.07);border:2px solid #D4AF37;' : 'background:white;border:1px solid rgba(212,175,55,0.16);'"
                   (click)="toggleSupplement(supp.id)">
                <div class="flex items-start gap-4">
                  <!-- Visual icon container -->
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                       [style]="supp.selected ? 'background:rgba(212,175,55,0.12);' : 'background:rgba(212,175,55,0.06);'">
                    {{ supp.icon }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div class="text-sm font-bold" style="color:#1A1A1A;">{{ supp.name }}</div>
                      <!-- Custom checkbox -->
                      <div class="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5"
                           [style]="supp.selected ? 'background:#D4AF37;' : 'background:white;border:1.5px solid rgba(212,175,55,0.35);'">
                        @if (supp.selected) {
                          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                        }
                      </div>
                    </div>
                    <div class="text-xs mt-1 leading-relaxed" style="color:rgba(26,26,26,0.5);">{{ supp.description }}</div>
                    <div class="text-xs font-bold mt-2" style="color:#D4AF37;">+{{ supp.price }} MAD</div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- ══ BOOKING FORM ══ -->
        <div id="book">
          <div class="text-[10px] font-bold tracking-[0.3em] uppercase mb-2" style="color:#D4AF37;">5 · Réserver votre date</div>
          <p class="text-xs mb-8" style="color:rgba(26,26,26,0.45);">Remplissez vos coordonnées et nous confirmerons votre réservation sous 24h.</p>

          <div class="rounded-3xl p-8" style="background:rgba(255,255,255,0.75);border:1px solid rgba(212,175,55,0.2);box-shadow:0 24px 64px rgba(212,175,55,0.07);">
            @if (!formSubmitted()) {
              <form (ngSubmit)="onFormSubmit()" #bookingForm="ngForm">
                <input type="hidden" name="_subject" value="Nouvelle réservation — Golden Event">
                <input type="hidden" name="theme_choisi" [value]="selectedTheme().name">
                <input type="hidden" name="configuration_arches" [value]="backdropLabel()">
                <input type="hidden" name="configuration_tables" [value]="tableLabel()">
                <input type="hidden" name="ajouts_premium" [value]="selectedSupplementNames()">
                <input type="hidden" name="total_estime" [value]="estimatedTotal() + ' MAD'">

                <div class="space-y-5">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label class="block text-[10px] tracking-[0.2em] uppercase mb-2" style="color:rgba(26,26,26,0.4);">Nom complet</label>
                      <input type="text" name="full_name" [(ngModel)]="bookingData.fullName" placeholder="Votre nom complet" required
                             class="w-full px-4 py-3.5 rounded-2xl text-sm"
                             style="background:rgba(255,255,255,0.8);border:1px solid rgba(212,175,55,0.22);color:#1A1A1A;outline:none;">
                    </div>
                    <div>
                      <label class="block text-[10px] tracking-[0.2em] uppercase mb-2" style="color:rgba(26,26,26,0.4);">Téléphone</label>
                      <input type="tel" name="phone" [(ngModel)]="bookingData.phone" placeholder="+212 XXXXXXXXX" required
                             class="w-full px-4 py-3.5 rounded-2xl text-sm"
                             style="background:rgba(255,255,255,0.8);border:1px solid rgba(212,175,55,0.22);color:#1A1A1A;outline:none;">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label class="block text-[10px] tracking-[0.2em] uppercase mb-2" style="color:rgba(26,26,26,0.4);">Date de l'événement</label>
                      <input type="date" name="event_date" [(ngModel)]="bookingData.eventDate" required
                             class="w-full px-4 py-3.5 rounded-2xl text-sm"
                             style="background:rgba(255,255,255,0.8);border:1px solid rgba(212,175,55,0.22);color:#1A1A1A;outline:none;">
                    </div>
                    <div>
                      <label class="block text-[10px] tracking-[0.2em] uppercase mb-2" style="color:rgba(26,26,26,0.4);">Heure de début</label>
                      <input type="time" name="event_hour" [(ngModel)]="bookingData.eventHour"
                             class="w-full px-4 py-3.5 rounded-2xl text-sm"
                             style="background:rgba(255,255,255,0.8);border:1px solid rgba(212,175,55,0.22);color:#1A1A1A;outline:none;">
                    </div>
                  </div>

                  <div>
                    <label class="block text-[10px] tracking-[0.2em] uppercase mb-2" style="color:rgba(26,26,26,0.4);">Demandes spéciales & Notes</label>
                    <textarea name="notes" [(ngModel)]="bookingData.notes" rows="4"
                              placeholder="Partagez votre vision, détails du lieu, préférences de couleurs…"
                              class="w-full px-4 py-3.5 rounded-2xl text-sm resize-none"
                              style="background:rgba(255,255,255,0.8);border:1px solid rgba(212,175,55,0.22);color:#1A1A1A;outline:none;"></textarea>
                  </div>

                  <button type="submit"
                          class="group w-full rounded-2xl py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-gold-xl inline-flex items-center justify-center gap-2"
                          style="background:linear-gradient(135deg,#D4AF37,#C4A02A);">
                    Envoyer la demande de réservation
                    <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                  </button>
                  <p class="text-xs text-center" style="color:rgba(26,26,26,0.35);">Réponse sous 24h &bull; WhatsApp: <a href="https://wa.me/212719455509" target="_blank" class="underline underline-offset-2" style="color:#D4AF37;">0719455509</a></p>
                </div>
              </form>
            } @else {
              <div class="text-center py-10">
                <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style="background:rgba(212,175,55,0.1);border:2px solid rgba(212,175,55,0.3);">
                  <svg class="w-8 h-8" style="color:#D4AF37;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 class="font-display italic text-2xl mb-3" style="color:#1A1A1A;">Demande reçue !</h3>
                <p class="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style="color:rgba(26,26,26,0.55);">Merci de faire confiance à Golden Event by Khaoula. Nous vous contacterons dans les 24h pour confirmer tous les détails de votre célébration.</p>
                <a href="https://wa.me/212719455509" target="_blank" rel="noopener"
                   class="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white"
                   style="background:#D4AF37;">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path [attr.d]="waPath"/></svg>
                  Continuer sur WhatsApp
                </a>
              </div>
            }
          </div>
        </div>

      </div><!-- /left col -->

      <!-- RIGHT: Live Sidebar Configuration Drawer -->
      <div class="lg:col-span-1">
        <div class="rounded-3xl p-7 lg:sticky lg:top-28" style="background:rgba(255,255,255,0.82);border:1.5px solid rgba(212,175,55,0.22);backdrop-filter:blur(14px);box-shadow:0 24px 64px rgba(212,175,55,0.09);">

          <div class="text-[10px] font-black tracking-[0.3em] uppercase mb-5" style="color:#D4AF37;">Mon Événement</div>

          <!-- Selected theme preview -->
          <div class="rounded-2xl overflow-hidden mb-5">
            <div class="h-28 relative flex items-end"
                 [style]="'background:linear-gradient(140deg,' + selectedTheme().gradientFrom + ',' + selectedTheme().gradientTo + ');'">
              <div class="absolute top-0 left-1/2 -translate-x-1/2" style="width:80px;height:60px;border:1.5px solid rgba(255,255,255,0.3);border-top:none;border-radius:0 0 40px 40px;"></div>
              <div class="relative z-10 p-4">
                <div class="text-[9px] font-bold tracking-widest uppercase" style="color:rgba(255,255,255,0.65);">Thème sélectionné</div>
                <div class="text-sm font-bold" style="color:white;">{{ selectedTheme().name }}</div>
              </div>
            </div>
          </div>

          <!-- Configuration summary -->
          <div class="space-y-2.5 mb-6">
            <div class="flex items-center justify-between text-sm">
              <span style="color:rgba(26,26,26,0.55);">Package de base</span>
              <span class="font-bold tabular-nums" style="color:#1A1A1A;">{{ selectedTheme().basePrice }} MAD</span>
            </div>

            @if (backdropTier() !== 'standard') {
              <div class="flex items-center justify-between text-sm">
                <span style="color:rgba(26,26,26,0.55);">{{ backdropLabel() }}</span>
                <span class="font-semibold tabular-nums" style="color:#D4AF37;">+{{ backdropPrice() }} MAD</span>
              </div>
            }

            @if (tableTier() !== 'none') {
              <div class="flex items-center justify-between text-sm">
                <span style="color:rgba(26,26,26,0.55);">{{ tableLabel() }}</span>
                <span class="font-semibold tabular-nums" style="color:#D4AF37;">+{{ tablePrice() }} MAD</span>
              </div>
            }

            @for (supp of supplements(); track supp.id) {
              @if (supp.selected) {
                <div class="flex items-center justify-between text-sm">
                  <span style="color:rgba(26,26,26,0.55);">{{ supp.name }}</span>
                  <span class="font-semibold tabular-nums" style="color:#D4AF37;">+{{ supp.price }} MAD</span>
                </div>
              }
            }

            @if (supplementsTotal() === 0) {
              <div class="text-xs italic" style="color:rgba(26,26,26,0.3);">Aucun ajout sélectionné</div>
            }
          </div>

          <!-- Total -->
          <div class="pt-5 mb-6" style="border-top:1.5px solid rgba(212,175,55,0.18);">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold" style="color:#1A1A1A;">Total estimé</span>
              <span class="font-display italic text-3xl tabular-nums" style="color:#D4AF37;">{{ estimatedTotal() }}<span class="text-base ml-1">MAD</span></span>
            </div>
          </div>

          <button (click)="scrollToBook()"
                  class="w-full rounded-2xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-gold-lg"
                  style="background:linear-gradient(135deg,#D4AF37,#C4A02A);">
            Procéder à la réservation →
          </button>

          <div class="mt-5 pt-5" style="border-top:1px solid rgba(212,175,55,0.12);">
            <a href="https://wa.me/212719455509" target="_blank" rel="noopener"
               class="flex items-center justify-center gap-2 text-xs font-semibold transition-colors hover:opacity-80"
               style="color:rgba(26,26,26,0.45);">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path [attr.d]="waPath"/></svg>
              Questions? Contactez-nous
            </a>
          </div>
        </div>
      </div><!-- /right sidebar -->

    </div><!-- /grid -->
  </div><!-- /max-w -->

  <ng-container *ngTemplateOutlet="footerTpl"></ng-container>
</div>
} <!-- /customizer view -->


<!-- ══════════════════════════════════════════════════
     SHARED FOOTER TEMPLATE
══════════════════════════════════════════════════ -->
<ng-template #footerTpl>
  <footer style="background:#1A1A1A;">
    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div class="font-display italic text-2xl mb-1" style="color:#D4AF37;">Golden Event</div>
          <div class="text-[9px] tracking-[0.28em] uppercase mb-4" style="color:rgba(253,251,247,0.3);">by Khaoula</div>
          <p class="text-sm leading-relaxed" style="color:rgba(253,251,247,0.42);">Transformer vos moments en souvenirs éternels grâce à des décorations d'exception et des thèmes sur mesure.</p>
        </div>
        <div>
          <div class="text-[9px] tracking-[0.25em] uppercase mb-4" style="color:rgba(253,251,247,0.28);">Navigation</div>
          <div class="space-y-2.5">
            <button (click)="goTo('home')" class="block text-sm transition-colors hover:text-gold" style="color:rgba(253,251,247,0.5);">Accueil</button>
            <button (click)="scrollHome('catalog')" class="block text-sm transition-colors hover:text-gold" style="color:rgba(253,251,247,0.5);">Collection</button>
            <button (click)="goTo('customizer')" class="block text-sm transition-colors hover:text-gold" style="color:rgba(253,251,247,0.5);">Configurer</button>
          </div>
        </div>
        <div>
          <div class="text-[9px] tracking-[0.25em] uppercase mb-4" style="color:rgba(253,251,247,0.28);">Contact</div>
          <div class="space-y-3">
            <a href="https://wa.me/212719455509" target="_blank" rel="noopener"
               class="flex items-center gap-3 text-sm group" style="color:rgba(253,251,247,0.5);">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(212,175,55,0.15);">
                <svg class="w-4 h-4" fill="currentColor" style="color:#D4AF37;" viewBox="0 0 24 24"><path [attr.d]="waPath"/></svg>
              </div>
              0719455509
            </a>
            <a href="https://instagram.com/goldenevent.__" target="_blank" rel="noopener"
               class="flex items-center gap-3 text-sm" style="color:rgba(253,251,247,0.5);">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(212,175,55,0.15);">
                <svg class="w-4 h-4" fill="currentColor" style="color:#D4AF37;" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              &#64;goldenevent.__
            </a>
          </div>
        </div>
      </div>
      <div class="mt-14 pt-8" style="border-top:1px solid rgba(255,255,255,0.06);">
        <p class="text-xs text-center" style="color:rgba(253,251,247,0.2);">&copy; 2025 Golden Event by Khaoula &bull; Meknès, Maroc</p>
      </div>
    </div>
  </footer>
</ng-template>

<!-- Floating badge (customizer only) -->
@if (currentView() === 'customizer') {
  <div class="fixed bottom-6 right-5 z-40 animate-float">
    <div class="rounded-2xl p-4 text-white min-w-[148px] text-right"
         style="background:linear-gradient(135deg,#D4AF37,#C4A02A);box-shadow:0 8px 32px rgba(212,175,55,0.4);">
      <div class="text-[9px] tracking-[0.2em] uppercase mb-1 opacity-75">Total estimé</div>
      <div class="font-display italic text-2xl tabular-nums leading-none">{{ estimatedTotal() }}</div>
      <div class="text-[10px] opacity-70 mt-0.5">MAD</div>
      <button (click)="scrollToBook()" class="mt-2.5 text-[9px] font-bold tracking-wider uppercase underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity">
        Réserver →
      </button>
    </div>
  </div>
}

</div><!-- /app wrapper -->
  `,
})
export class AppComponent {

  readonly waPath = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

  readonly tableTrios = [26, 34, 22];

  // ── Signals ───────────────────────────────────────────────────
  currentView     = signal<ViewType>('home');
  activeTab       = signal<string>('baby-shower');
  selectedThemeId = signal<string>('little-princesse');
  mobileMenuOpen  = signal<boolean>(false);
  formSubmitted   = signal<boolean>(false);
  testimonialIndex = signal<number>(0);
  faqOpenId       = signal<string | null>(null);
  backdropTier    = signal<BackdropTier>('standard');
  tableTier       = signal<TableTier>('none');

  supplements = signal<Supplement[]>([
    { id: 'macaron', icon: '🧁', name: 'Tour de Macarons', description: 'Macarons colorés sur présentoir étagé en cristal', price: 200, selected: false },
    { id: 'neon',    icon: '✨', name: 'Enseigne Néon sur Mesure', description: 'LED néon avec prénom, phrase ou initiales du bébé', price: 400, selected: false },
    { id: 'candy',   icon: '🍬', name: 'Bar à Bonbons Premium', description: 'Bocaux thématiques, présentoirs et emballages personnalisés', price: 180, selected: false },
    { id: 'florals', icon: '💐', name: 'Arrangements Floraux Luxe', description: 'Fleurs fraîches ou en soie dans les teintes du thème', price: 350, selected: false },
  ]);

  bookingData: BookingData = { fullName: '', phone: '+212 ', eventDate: '', eventHour: '', baseTheme: 'little-princesse', notes: '' };

  // ── Static data ───────────────────────────────────────────────
  tabs = [
    { id: 'baby-shower', label: 'Baby Shower' },
    { id: 'birthday',    label: 'Anniversaires' },
    { id: 'henna',       label: 'Henna & Anniversaire' },
  ];

  stats = [
    { value: '200+', label: 'Événements décorés' },
    { value: '5 ★',  label: 'Service noté' },
    { value: '100%', label: 'Thèmes personnalisés' },
  ];

  testimonials = [
    { name: 'Fatima Z.', location: 'Meknès', event: 'Baby Shower Princesse', quote: 'L\'arche en tulle rose et or était absolument féerique. Toutes mes invitées ont pris des dizaines de photos. Khaoula a transformé notre salon en véritable conte de fées.' },
    { name: 'Leila M.',  location: 'Rabat',  event: 'Bearly Wait Baby Shower', quote: 'L\'esthétique neutre beige-caramel était exactement ce que je rêvais. Chaque détail était coordonné avec une précision incroyable. Service irréprochable du début à la fin.' },
    { name: 'Sara K.',   location: 'Casablanca', event: '1er Anniversaire', quote: 'Le ballon "1" géant et l\'arche assortie ont époustouflé tous nos invités. La qualité des matériaux est premium — rien à voir avec ce qu\'on voit habituellement.' },
    { name: 'Nadia B.',  location: 'Fès',    event: 'Welcome Little Prince', quote: 'L\'arche bleu royal avec accents dorés était majestueuse. Mon fils portait une couronne assortie. Des moments gravés à jamais dans notre mémoire familiale.' },
    { name: 'Amira H.',  location: 'Meknès', event: 'Soirée Henna', quote: 'Une fusion parfaite de tradition marocaine et de luxe moderne. L\'enseigne néon avec mon prénom en calligraphie arabe était un chef-d\'œuvre. Tout le monde était bouche bée.' },
  ];

  faqs: FaqItem[] = [
    { id: 'f1', q: 'Combien de temps à l\'avance faut-il réserver ?', a: 'Nous recommandons de réserver au moins 3 à 4 semaines avant votre événement. Pour les périodes de fêtes (Aïd, saison estivale), prévoyez 6 à 8 semaines à l\'avance pour garantir la disponibilité.' },
    { id: 'f2', q: 'La livraison et l\'installation sont-elles incluses ?', a: 'Oui, absolument ! Notre équipe prend en charge la livraison complète, l\'installation professionnelle et le démontage après votre événement. Nous intervenons à Meknès et dans les villes environnantes.' },
    { id: 'f3', q: 'Puis-je personnaliser la palette de couleurs ?', a: 'Bien sûr. Chaque package peut être adapté à votre palette de couleurs préférée. Lors de notre consultation initiale, nous définissons ensemble chaque détail pour que le résultat correspond exactement à votre vision.' },
    { id: 'f4', q: 'Quelle est votre politique de paiement ?', a: 'Nous demandons un acompte de 50% à la confirmation de la réservation pour sécuriser votre date. Le solde restant est réglé le jour de l\'installation. Nous acceptons les virements bancaires et le paiement en espèces.' },
    { id: 'f5', q: 'Intervenez-vous en dehors de Meknès ?', a: 'Oui, nous servons toute la région, incluant Rabat, Casablanca, Fès et Ifrane. Des frais de déplacement supplémentaires peuvent s\'appliquer selon la distance. Contactez-nous pour un devis personnalisé.' },
  ];

  allThemes: Theme[] = [
    {
      id: 'little-princesse', tab: 'baby-shower',
      name: 'Welcome Little Princesse',
      subtitle: 'Rose · Blanc · Or Métallique',
      description: 'Une célébration féerique pour votre petite princesse. Arches en ballons blush et or, nœuds aquarelle, peluche géante et tour de macarons.',
      longDescription: 'Plongez dans un univers de douceur et d\'élégance avec notre thème signature "Welcome Little Princesse". Cette installation crée une atmosphère de conte de fées grâce à des arches en ballons roses et or soigneusement assemblées, un backdrop aquarelle aux motifs de nœuds peints à la main, et une peluche géante de luxe habillée d\'un ruban de soie rose. Chaque détail est pensé pour offrir aux mamans et à leurs invitées un cadre photo inoubliable — un souvenir qui durera bien au-delà de la célébration elle-même.',
      accentHex: '#E8A0B0', gradientFrom: '#FFF0F3', gradientTo: '#FEE8D6',
      basePrice: 800, badge: 'Plus Populaire',
      highlights: ['Backdrop Aquarelle aux Nœuds', 'Arche Ballons Blush & Or', 'Peluche Géante de Luxe', 'Détails en Ruban de Soie', 'Couronne Florale Thématique'],
      whatIsIncluded: [
        'Arche principale en ballons organique (blush, rose, or, blanc perle)',
        'Backdrop personnalisé motif nœud aquarelle (1,80m × 2,20m)',
        'Peluche géante XXL (80cm) avec ruban de soie rose',
        'Table de présentation avec linge assorti',
        'Couronne florale thématique pour l\'entrée',
        'Ballon numéroté "Baby Shower" central',
        'Décorations de sol et chemin de ballons',
        'Installation, montage et démontage inclus',
      ],
      palette: [{ name: 'Blush', hex: '#FFB6C1' }, { name: 'Perle', hex: '#F9F0F3' }, { name: 'Or', hex: '#D4AF37' }, { name: 'Rose', hex: '#E8A0B0' }],
      testimonialQuotes: [
        { name: 'Fatima Z.', location: 'Meknès', event: 'Baby Shower', quote: 'L\'arche rose et or était absolument magnifique. Toutes les invitées se prenaient en photo devant. La qualité est vraiment premium — j\'ai été époustouflée dès l\'entrée.' },
        { name: 'Hasna R.', location: 'Meknès', event: 'Baby Shower', quote: 'La peluche géante avec le ruban rose était à croquer. Ma fille en parle encore six mois après. Khaoula a compris exactement ce que je voulais dès la première consultation.' },
        { name: 'Imane B.', location: 'Ifrane', event: 'Baby Shower', quote: 'J\'ai fait des dizaines de recherches sur Instagram et rien ne m\'avait autant convaincue. Le rendu réel dépasse largement les photos. Service ponctuel et professionnel.' },
      ],
    },
    {
      id: 'bearly-wait', tab: 'baby-shower',
      name: 'Bearly Wait',
      subtitle: 'Beige · Crème · Caramel',
      description: 'Un univers douillet et naturel pour célébrer l\'arrivée du bébé. Ballons neutres, motifs montgolfières et oursons en bois flotté.',
      longDescription: 'L\'esthétique "Bearly Wait" célèbre la beauté du naturel et la chaleur du cocon familial. Cette installation aux tons beige, crème et caramel crée un univers boisé et poétique autour de votre baby shower. Des motifs montgolfières délicatement illustrés côtoient des guirlandes de ballons en tons neutres, tandis qu\'un ourson en bois flotté trône sur un présentoir en rotin. L\'ensemble dégage une atmosphère sereine et authentique, parfaite pour les familles qui recherchent une esthétique intemporelle loin des codes roses ou bleus traditionnels.',
      accentHex: '#C49A6C', gradientFrom: '#FFF8EE', gradientTo: '#F5E6C8',
      basePrice: 800,
      highlights: ['Motifs Montgolfières Illustrés', 'Guirlande Ballons Neutres', 'Ourson Centrepiece en Rotin', 'Accessoires Bois & Lin', 'Détails Kraft & Jute'],
      whatIsIncluded: [
        'Arche organique en ballons beige, crème, caramel et blanc cassé',
        'Backdrop "Bearly Wait" illustré avec montgolfières',
        'Ourson centrepiece avec accents bois et rotin',
        'Guirlande de feuillage séché et pompons de papier',
        'Signalétique bois personnalisée avec prénom',
        'Table de présentation avec nappe en lin naturel',
        'Ballons satellites thématiques répartis en salle',
        'Installation, montage et démontage inclus',
      ],
      palette: [{ name: 'Beige', hex: '#F5E6C8' }, { name: 'Crème', hex: '#FFF8F0' }, { name: 'Caramel', hex: '#C49A6C' }, { name: 'Sable', hex: '#C2A47E' }],
      testimonialQuotes: [
        { name: 'Leila M.', location: 'Rabat', event: 'Baby Shower', quote: 'C\'était exactement l\'ambiance intime et chaleureuse que je recherchais. Les tons neutres se mariaient parfaitement avec notre intérieur. Mes invitées ont adoré le style épuré.' },
        { name: 'Yasmina O.', location: 'Salé', event: 'Baby Shower', quote: 'La signalétique en bois avec le prénom de mon fils était un détail magnifique que nous avons gardé dans sa chambre. Tout était coordonné avec une attention rare aux détails.' },
        { name: 'Dounia F.', location: 'Meknès', event: 'Baby Shower Mixte', quote: 'Nous ne connaissions pas encore le sexe du bébé, donc les tons neutres étaient parfaits. Le rendu était élégant et sophistiqué — bien au-dessus de mes attentes.' },
      ],
    },
    {
      id: 'little-prince', tab: 'baby-shower',
      name: 'Welcome Little Prince',
      subtitle: 'Bleu Royal · Blanc · Or',
      description: 'Une célébration royale pour votre petit prince. Arches bleu roi et or, impressions florales, rubans velours bleu et tour de macarons.',
      longDescription: 'Digne d\'un palais, l\'installation "Welcome Little Prince" enveloppe votre célébration d\'une majesté royale au charme irrésistible. L\'arche principale en ballons bleu royal et dorés forme un cadre architectural saisissant, magnifié par un backdrop orné d\'impressions florales exclusives. Des rubans en velours bleu profond descendent gracieusement de chaque côté, encadrant une table de desserts couronnée d\'une tour de macarons bleus et dorés. Chaque élément est sélectionné pour sa qualité et sa cohérence avec la palette royale — un ensemble qui impressionne au premier regard.',
      accentHex: '#4169E1', gradientFrom: '#EEF3FF', gradientTo: '#D0DEFF',
      basePrice: 850, badge: 'Édition Royale',
      highlights: ['Arche Ballons Bleu Royal', 'Impressions Florales Exclusives', 'Rubans Velours Bleu', 'Accents Couronne & Étoile', 'Tour de Macarons Thématique'],
      whatIsIncluded: [
        'Arche principale en ballons bleu royal, ciel, blanc et or',
        'Backdrop imprimé motifs floraux exclusifs (édition prince)',
        'Rubans velours bleu profond tombants (6 mètres)',
        'Accents décoratifs couronne et étoiles en acrylique doré',
        'Tour de macarons bleus et dorés sur présentoir cristal',
        'Signalétique "Welcome Little Prince" en acrylique',
        'Ballons satellites thématiques répartis en salle',
        'Installation, montage et démontage inclus',
      ],
      palette: [{ name: 'Royal', hex: '#4169E1' }, { name: 'Ciel', hex: '#87CEEB' }, { name: 'Blanc', hex: '#F0F4FF' }, { name: 'Or', hex: '#D4AF37' }],
      testimonialQuotes: [
        { name: 'Nadia B.', location: 'Fès', event: 'Baby Shower', quote: 'L\'arche bleu royal était majestueuse. Mon fils portait une petite couronne assortie — les photos sont dignes d\'un magazine. Le service était ponctuel et extrêmement soigné.' },
        { name: 'Houda K.', location: 'Meknès', event: 'Baby Shower', quote: 'La qualité des ballons et la cohérence des couleurs étaient remarquables. Khaoula a su créer un univers royal sans tomber dans le trop chargé. Parfaitement équilibré.' },
        { name: 'Meriem A.', location: 'Meknès', event: 'Gender Reveal Prince', quote: 'Nous avons utilisé ce thème pour notre gender reveal et l\'effet surprise était grandiose. Tous les invités ont été impressionnés par la grandeur de l\'installation.' },
      ],
    },
    {
      id: 'first-birthday', tab: 'birthday',
      name: '1er Anniversaire Prestige',
      subtitle: 'Ivoire · Or · Blush',
      description: 'Le premier anniversaire le plus précieux mérite le meilleur. Ballon numéral "1" géant, backdrop cake-smash et table de desserts opulente.',
      longDescription: 'Le premier anniversaire est un jalon unique dans la vie de votre enfant — et dans la vôtre. Notre installation "1er Anniversaire Prestige" crée un cadre photographique inoubliable autour de ce moment historique. La pièce maîtresse : un imposant ballon numéral "1" en or, entouré d\'une arche organique en ballons ivoire, blush et champagne. Le backdrop "cake-smash" créé sur mesure permet de capturer les sourires de votre bébé dans son premier contact avec son gâteau — une scène précieuse encadrée par nos soins avec une attention méticuleuse à chaque détail.',
      accentHex: '#C9B037', gradientFrom: '#FFFDF0', gradientTo: '#FFF0D0',
      basePrice: 900, badge: 'Premium',
      highlights: ['Ballon Numéral "1" Géant', 'Backdrop Cake-Smash', 'Couronne Florale Premium', 'Palette Or & Ivoire', 'Table de Desserts Centrepiece'],
      whatIsIncluded: [
        'Ballon numéral "1" géant or (100cm de hauteur)',
        'Arche organique ivoire, blush, champagne et or',
        'Backdrop personnalisé cake-smash avec prénom',
        'Couronne florale premium pour le bébé (fleurs fraîches)',
        'Table de desserts thématique avec linge et chemin de table or',
        'Accessoires photo : hochets, blocs lettres, étoiles',
        'Guirlande lumineuse LED chaude pour ambiance',
        'Installation, montage et démontage inclus',
      ],
      palette: [{ name: 'Ivoire', hex: '#FFFFF0' }, { name: 'Or', hex: '#C9B037' }, { name: 'Blush', hex: '#FADADD' }, { name: 'Champagne', hex: '#F7E7CE' }],
      testimonialQuotes: [
        { name: 'Sara K.', location: 'Casablanca', event: '1er Anniversaire', quote: 'Le ballon "1" géant en or était la pièce centrale parfaite pour les photos. Mon fils a adoré le toucher. Les invités n\'arrêtaient pas de complimenter la qualité de la décoration.' },
        { name: 'Ghita P.', location: 'Rabat', event: '1er Anniversaire', quote: 'La couronne florale fraîche pour ma fille était adorable et les photos cake-smash sont mes préférées de toute sa première année. Service impeccable et livraison exactement à l\'heure.' },
        { name: 'Zineb R.', location: 'Meknès', event: '1er Anniversaire', quote: 'J\'avais peur que ça soit trop chargé mais l\'équilibre des couleurs ivoire-or était parfait. Élégant et festif à la fois. Nous avons reçu des compliments pendant des semaines.' },
      ],
    },
    {
      id: 'birthday-custom', tab: 'birthday',
      name: 'Anniversaire sur Mesure',
      subtitle: 'Entièrement Personnalisé',
      description: 'Votre vision, notre exécution. N\'importe quelle palette, personnage ou thème — de la princesse Disney à la jungle safari.',
      longDescription: 'Avec notre thème "Anniversaire sur Mesure", les seules limites sont celles de votre imagination. Lors d\'une consultation dédiée, nous recueillons votre vision dans ses moindres détails : palette de couleurs, univers thématique, personnages préférés de votre enfant, contraintes de lieu. Notre équipe crée ensuite un plan d\'installation unique, avec backdrop imprimé sur mesure, ballons colorés selon vos spécifications exactes et accessoires fabriqués ou sourcés spécialement pour votre événement. C\'est notre offre la plus personnelle — et souvent la plus mémorable.',
      accentHex: '#D4AF37', gradientFrom: '#FDFBF7', gradientTo: '#FFF5D6',
      basePrice: 750, badge: 'Sur Mesure',
      highlights: ['Consultation Design Dédiée', 'Intégration de Personnages', 'Backdrop Imprimé Personnalisé', 'Guirlande Ballons Thématique', 'Table de Desserts Complète'],
      whatIsIncluded: [
        'Consultation design personnalisée (45 min)',
        'Backdrop imprimé haute résolution avec votre thème choisi',
        'Arche organique dans votre palette de couleurs exacte',
        'Accessoires et props thématiques sur mesure',
        'Signalétique personnalisée avec prénom et âge',
        'Table de desserts avec linge et chemin de table assortis',
        'Ballons satellites thématiques répartis en salle',
        'Installation, montage et démontage inclus',
      ],
      palette: [{ name: 'Or', hex: '#D4AF37' }, { name: 'Corail', hex: '#FF6B6B' }, { name: 'Jade', hex: '#4ECDC4' }, { name: 'Citron', hex: '#FFE66D' }],
      testimonialQuotes: [
        { name: 'Rania M.', location: 'Meknès', event: 'Anniversaire 4 ans', quote: 'Ma fille voulait une fête "licorne arc-en-ciel" et Khaoula a créé quelque chose de magique au-delà de tout ce qu\'on aurait pu imaginer. Chaque couleur était parfaitement dosée.' },
        { name: 'Khadija S.', location: 'Meknès', event: 'Anniversaire 7 ans', quote: 'Le thème "jungle safari" que nous avons choisi était rendu avec un niveau de détail professionnel. Les girafes en ballon et les feuilles tropicales étaient bluffants.' },
        { name: 'Salma T.', location: 'Khénifra', event: 'Anniversaire surprise', quote: 'Khaoula a su garder le secret jusqu\'au bout tout en coordonnant l\'installation avant l\'arrivée de mon mari. La surprise était totale et la décoration était somptueuse.' },
      ],
    },
    {
      id: 'henna-anniversary', tab: 'henna',
      name: 'Henna & Anniversaire Marocain',
      subtitle: 'Opulence · Tradition · Glamour',
      description: 'Une fusion éblouissante de tradition marocaine et luxe moderne. Backdrops dorés, enseignes néon, tables géométriques arabesque et colonnades florales.',
      longDescription: 'Notre installation "Henna & Anniversaire Marocain" est notre création la plus somptueuse — une ode à la richesse de la tradition marocaine revisitée avec un œil contemporain. Les backdrops en drapés dorés et ivoire créent un cadre architectural majestueux, renforcé par des colonnes décoratives en stuc blanc et des motifs arabesques intégrés. L\'enseigne néon personnalisée en calligraphie arabe ajoute une touche moderne et lumineuse qui contraste superbement avec la richesse des matières traditionnelles. Les tables géométriques ornées de mosaïques complètent un ensemble qui fait honneur à la splendeur de la culture marocaine.',
      accentHex: '#B8860B', gradientFrom: '#FDF8E8', gradientTo: '#F5E6B0',
      basePrice: 1200, badge: 'Prestige',
      highlights: ['Backdrop Drapés Or & Ivoire', 'Enseigne Néon Calligraphie', 'Tables Géométriques Arabesque', 'Accents Motifs Arabesques', 'Colonnades Florales Premium'],
      whatIsIncluded: [
        'Backdrop principal en drapés or et ivoire (3m × 2,5m)',
        'Enseigne néon LED personnalisée en calligraphie arabe ou latine',
        'Tables de présentation géométriques ornées de mosaïques',
        'Deux colonnades florales premium (fleurs fraîches ou soie)',
        'Lustre décoratif suspendu avec guirlande de fleurs',
        'Coussins et poufs en velours brodé pour la zone assise',
        'Éclairage ambiance LED chaud intégré à l\'installation',
        'Installation, montage et démontage inclus',
      ],
      palette: [{ name: 'Or Profond', hex: '#B8860B' }, { name: 'Ivoire', hex: '#FFFFF0' }, { name: 'Bordeaux', hex: '#800020' }, { name: 'Bronze', hex: '#CD7F32' }],
      testimonialQuotes: [
        { name: 'Amira H.', location: 'Meknès', event: 'Soirée Henna', quote: 'C\'était exactement la fusion tradition-modernité que je rêvais. L\'enseigne néon avec mon prénom en calligraphie arabe était un chef-d\'œuvre. Toutes les invitées ont été éblouies.' },
        { name: 'Soukaina L.', location: 'Meknès', event: 'Anniversaire de Mariage', quote: 'Les drapés dorés et les tables en mosaïque créaient une atmosphère digne d\'un palais marocain. Notre 10ème anniversaire de mariage a été célébré comme il se doit.' },
        { name: 'Aicha N.', location: 'Fès', event: 'Henna Party', quote: 'Khaoula a compris exactement l\'âme de notre tradition tout en lui donnant une modernité élégante. L\'enseigne néon était le détail parfait pour les photos Instagram.' },
      ],
    },
  ];

  // ── Computed signals ──────────────────────────────────────────
  filteredThemes = computed(() => this.allThemes.filter(t => t.tab === this.activeTab()));

  selectedTheme = computed(() => this.allThemes.find(t => t.id === this.selectedThemeId()) ?? this.allThemes[0]);

  backdropPrice = computed(() => ({ standard: 0, double: 300, trio: 550 }[this.backdropTier()]));
  tablePrice    = computed(() => ({ none: 0, single: 250, trio: 450 }[this.tableTier()]));

  supplementsTotal = computed(() =>
    this.backdropPrice() + this.tablePrice() +
    this.supplements().filter(s => s.selected).reduce((sum, s) => sum + s.price, 0)
  );

  estimatedTotal = computed(() => this.selectedTheme().basePrice + this.supplementsTotal());

  selectedSupplementNames = computed(() => {
    const parts: string[] = [];
    if (this.backdropTier() !== 'standard') parts.push(this.backdropLabel());
    if (this.tableTier() !== 'none') parts.push(this.tableLabel());
    this.supplements().filter(s => s.selected).forEach(s => parts.push(s.name));
    return parts.length ? parts.join(', ') : 'Aucun ajout';
  });

  // ── Methods ───────────────────────────────────────────────────
  backdropLabel(): string {
    return { standard: '1 Arche (Standard)', double: '2 Arches', trio: 'Trio Duo-Arch' }[this.backdropTier()];
  }
  tableLabel(): string {
    return { none: 'Sans table', single: 'Table Solo', trio: 'Trio Étagé' }[this.tableTier()];
  }

  goTo(view: ViewType): void {
    this.currentView.set(view);
    this.mobileMenuOpen.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openDetail(themeId: string): void {
    this.selectedThemeId.set(themeId);
    this.bookingData.baseTheme = themeId;
    const theme = this.allThemes.find(t => t.id === themeId);
    if (theme) this.activeTab.set(theme.tab);
    this.currentView.set('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectTheme(themeId: string): void {
    this.selectedThemeId.set(themeId);
    this.bookingData.baseTheme = themeId;
    const theme = this.allThemes.find(t => t.id === themeId);
    if (theme) this.activeTab.set(theme.tab);
  }

  switchTab(tabId: string): void {
    this.activeTab.set(tabId);
    const first = this.allThemes.find(t => t.tab === tabId);
    if (first) this.selectedThemeId.set(first.id);
  }

  scrollHome(sectionId: string): void {
    if (this.currentView() !== 'home') {
      this.currentView.set('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.mobileMenuOpen.set(false);
  }

  scrollToBook(): void {
    const el = document.getElementById('book');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleSupplement(id: string): void {
    this.supplements.update(list => list.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  }

  nextTestimonial(): void {
    this.testimonialIndex.update(i => (i + 1) % this.testimonials.length);
  }

  prevTestimonial(): void {
    this.testimonialIndex.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }

  toggleFaq(id: string): void {
    this.faqOpenId.update(current => current === id ? null : id);
  }

  onFormSubmit(): void {
    this.formSubmitted.set(true);
    const el = document.getElementById('book');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
