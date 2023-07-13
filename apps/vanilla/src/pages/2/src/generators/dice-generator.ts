import { MAX_DICE_RESULT, MIN_DICE_RESULT } from '../utils/consts';

import { Publisher } from './publisher';
import { RoundResult, Observer, PlayerTurn } from './types';

/** Dice generator. */
export class DiceGenerator extends Publisher<RoundResult> implements Observer<PlayerTurn> {
	public constructor() {
		super();
	}

	/**
	 * Randomly generates the value of game points.
	 */
	private getRandomValue(): number {
		return Math.floor(Math.random() * (MAX_DICE_RESULT + 1 - MIN_DICE_RESULT) + MIN_DICE_RESULT);
	}

	/**
	 * Function that notify subscribers about current game points.
	 * @param value Information about the turn order of players in the game.
	 */
	public update(value: PlayerTurn): void {
		const turnPoints = this.getRandomValue();
		this.notify({ turnPoints, currentPlayerIndex: value.currentPlayerIndex, nextPlayerIndex: value.nextPlayerIndex });
	}
}
