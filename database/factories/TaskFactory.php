<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TaskFactory extends Factory
{
    public static function getRandomUser(){
        return User::inRandomOrder()->limit(1)->pluck('id')->pop();
    }
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'task_info' => fake()->paragraph(3),
            'user_id' => static::getRandomUser()
        ];
    }
}
