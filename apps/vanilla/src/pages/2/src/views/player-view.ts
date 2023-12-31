import { DisplayTurn, Observer } from '../generators/types';
import { getSum, rerender } from '../utils';

import { View } from './view';

/** PLayer view. */
export class PlayerView extends View implements Observer<DisplayTurn> {
	/** HTML element. */
	protected override element: HTMLElement;

	/** Array of game points. */
	private points: number[];

	/** Player name. */
	private readonly name: string;

	public constructor(points: number[], name: string) {
		super();
		this.points = points;
		this.name = name;
		this.element = this.generateElement();
	}

	/** Returns template of view. */
	public override get template(): string {
		return this.getPlayerTemplate();
	}

	/**
	 * Update player view and rerender it.
	 * @param value Player display information.
	 */
	public update(value: DisplayTurn): void {
		this.points = value.points;
		const newElement = this.generateElement(this.getPlayerTemplate(value.isWin, value.isNext));
		rerender(this.element, newElement);
		this.element = newElement;
	}

	/**
	 * Returns player template that accepts arguments.
	 * @param isWin Win player status.
	 * @param isNext Status that means player will make turn in next round.
	 */
	private getPlayerTemplate(isWin = false, isNext = false): string {
		return `<li class="scores__player player">
      <h4 class="player__name ${isNext ? 'player__name_next' : ''}">${this.name}</h4>
      <h4 class="player__scores">Scores: ${getSum(this.points)}</h4>
      <div class="player__text-container ${isWin ? 'player__text-container_win' : ''}">
        <p class="player__text text">${this.points.join(' ')}</p>
      <div>
    </li>`;
	}
}
