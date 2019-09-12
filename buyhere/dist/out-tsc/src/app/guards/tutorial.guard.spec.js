import { TestBed, inject } from '@angular/core/testing';
import { TutorialGuard } from './tutorial.guard';
describe('TutorialGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [TutorialGuard]
        });
    });
    it('should ...', inject([TutorialGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=tutorial.guard.spec.js.map