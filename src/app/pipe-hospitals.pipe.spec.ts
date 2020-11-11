import { PipeHospitalsPipe } from './pipe-hospitals.pipe';

describe('PipeHospitalsPipe', () => {
  it('create an instance', () => {
    const pipe = new PipeHospitalsPipe();
    expect(pipe).toBeTruthy();
  });
});
