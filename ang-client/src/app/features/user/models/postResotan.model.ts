import { TipRestorana } from '../../home/models/tip_restorana.model';
import { LokacijaAdmin } from './lokacijaAdmin.model';
import { TipDatuma } from '../../restaurants/models/tipDatuma.model';
import { TipDatumaPost } from './tipDatumaPost.model';

export class PostRestoran {
  lokacije: LokacijaAdmin[] | undefined;
  nazivRestorana: string | undefined;
  opisRestorana: string | undefined;
  pibRestorana: string | undefined;
  radnoVreme: TipDatumaPost[] | undefined;
  slikaRestorana: string | undefined;
  telefonRestorana: string | undefined;
  tipRestorana: TipRestorana[] | undefined
}
