import {
  NgModule
} from '@angular/core';
import {
  ButtonModule,
  PopModule,
  ModalModule,
  FormFieldModule,
  InputModule,
  IconModule,
  ToasterModule,
  TileModule,
  ChipModule
} from '@healthcatalyst/cashmere';

@NgModule({
  exports: [ButtonModule, PopModule, ModalModule, FormFieldModule, InputModule, IconModule, ToasterModule, TileModule, ChipModule]
})
export class CashmereModule {}