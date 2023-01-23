import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsbarComponent } from './tagsbar.component';

describe('TagsbarComponent', () => {
  let component: TagsbarComponent;
  let fixture: ComponentFixture<TagsbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
