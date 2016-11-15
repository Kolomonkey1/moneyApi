describe('First Non-Repeated Character', () => {
  it('ABA', () => {
      expect(nonRepeatedCharacter('ABA')).to.equal('B');
  });
  it('AACBDB', () => {
      expect(nonRepeatedCharacter('AACBDB')).to.equal('C');
  });
  it('ABCDBIRDUP', () => {
      expect(nonRepeatedCharacter('ABCDBIRDUP')).to.equal('A');
  });
  it('XXXXXXX', () => {
      expect(nonRepeatedCharacter('XXXXXXX')).to.equal('sorry');
  });
  it('ALAMABA', () => {
      expect(nonRepeatedCharacter('ALAMABA')).to.equal('L');
  });
  it('BABA', () => {
      expect(nonRepeatedCharacter('BABA')).to.equal('sorry');
  });
});
