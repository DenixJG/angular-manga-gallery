import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaLibraryComponent } from './manga-library.component';

describe('MangaLibraryComponent', () => {
  let component: MangaLibraryComponent;
  let fixture: ComponentFixture<MangaLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
