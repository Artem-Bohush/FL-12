import { TestBed } from '@angular/core/testing';

import { CreditCardService } from './credit-card.service';
import { cardErrors } from '../static-data/card-errors';
import { cardList } from '../static-data/card-list';
import { CreditCard } from './credit-card.model';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });

  it('should create CreditCardService', async () => {
    expect(service).toBeTruthy();
  });
});

describe('testCreditCard function:', () => {
  let creditCardService: CreditCardService;
  const cards: CreditCard[] = cardList;
  const SCAM_NUMBER = '5490997771092064';
  const [
    VALID_CARD,
    UNKNOWN_TYPE,
    INVALID_NUMBER,
    INVALID_NUMBER_FORMAT,
    INVALID_LENGTH,
    SCAM_ATTEMPT
  ] = cardErrors;

  beforeEach(() => {
    creditCardService = new CreditCardService();
  });

  if (cards.length) {

    it('should recognize valid card data', () => {
      expect(creditCardService.testCreditCard('6011 0000 0000 0004', 'Discover')).toEqual({
        isValid: true,
        message: VALID_CARD
      });
    });

    it('should detect invalid card name', () => {
      let randomCardName = 'qwerty';

      function checkRandomName(): void {
        cards.forEach(card => {
          if (card.name === randomCardName) {
            randomCardName += 'salt';
            checkRandomName();
          }
        });
      }
      checkRandomName();

      expect(creditCardService.testCreditCard('any number', randomCardName)).toEqual({
        isValid: false,
        message: UNKNOWN_TYPE
      });
    });

    it('should detect invalid card number', () => {
      expect(creditCardService.testCreditCard('5500 0000 0000 000', 'MasterCard')).toEqual({
        isValid: false,
        message: INVALID_NUMBER
      });
    });

    it('should detect invalid card number format', () => {
      const wrongNumberFormats = ['123456789012', '12345678901234567890', '.2-34,56_a*7890!12'];

      wrongNumberFormats.forEach(cardNumber => {
        expect(creditCardService.testCreditCard(cardNumber, cards[0].name)).toEqual({
          isValid: false,
          message: INVALID_NUMBER_FORMAT
        });
      });
    });

    it('should check card number length', () => {
      expect(creditCardService.testCreditCard('3852 0000 02122', 'DinersClub')).toEqual({
        isValid: false,
        message: INVALID_LENGTH
      });

      expect(creditCardService.testCreditCard('3852 0000 0232 37119', 'DinersClub')).toEqual({
        isValid: false,
        message: INVALID_LENGTH
      });
    });

    it('should detect scam attempt', () => {
      expect(creditCardService.testCreditCard(SCAM_NUMBER, 'MasterCard')).toEqual({
        isValid: false,
        message: SCAM_ATTEMPT
      });

      expect(creditCardService.testCreditCard(SCAM_NUMBER, 'DinersClub')).toEqual({
        isValid: false,
        message: SCAM_ATTEMPT
      });
    });
  }
});
