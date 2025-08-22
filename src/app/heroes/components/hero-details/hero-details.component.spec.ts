import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailsComponent } from './hero-details.component';
import { Hero } from '../../../core/models/Hero';

describe('HeroDetailsComponent', () => {
  let component: HeroDetailsComponent;
  let fixture: ComponentFixture<HeroDetailsComponent>;
  const mockHero: Hero = {
    id: 1, name: 'Superman',
    slug: '',
    powerstats: {
      power: 0,
      speed: 0,
      combat: 0,
      strength: 0,
      durability: 0,
      intelligence: 0
    },
    appearance: {
      race: '',
      gender: '',
      height: [],
      weight: [],
      eyeColor: '',
      hairColor: ''
    },
    biography: {
      aliases: [],
      fullName: '',
      alignment: '',
      alterEgos: '',
      publisher: '',
      placeOfBirth: '',
      firstAppearance: ''
    },
    work: {
      base: '',
      occupation: ''
    },
    connections: {
      relatives: '',
      groupAffiliation: ''
    },
    images: {
      lg: '',
      md: '',
      sm: '',
      xs: ''
    }
  }; // 👈 Crea un héroe de prueba

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailsComponent);
    component = fixture.componentInstance;
    // Asigna el héroe de prueba al componente antes de la detección de cambios
    component.hero = mockHero; // 👈 ¡Asigna el mock hero aquí!
    fixture.detectChanges(); // 👈 Luego, detecta los cambios para renderizar el template
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ahora puedes agregar tests para verificar que los datos del mock hero se muestren correctamente en el template.
  it('should display the hero name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Superman');
  });
});
